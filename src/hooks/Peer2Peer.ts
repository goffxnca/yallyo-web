import { ISoundMeterInterface, SoundMeter } from "@/libs/soundmeter";
import { ISocketIOMessage, SessionsGatewayEventCode } from "@/types/common";
import { PermissionNotAllowed } from "@/types/errors";
import { EventEmitter } from "events";

interface Peer2PeerSettings {
  localUserId: string;
  camOnOnce: boolean;
  onStatusChange: Function;
  onLocalMediaStreamed: Function;
  onRemoteMediaStreamed: Function;
  onMediaPermissionRejected: Function;
  onDataChannelReceived: Function;
}

class Peer2Peer {
  peer: any = null;
  settings: Peer2PeerSettings | null = null;
  status: string = "";
  localStream: MediaStream | null = null;
  events = new EventEmitter();
  micProcesser: {
    audioContext: AudioContext | null;
    soundMeter: ISoundMeterInterface | null;
    meterRefreshInverval: NodeJS.Timeout | null;
  } = {
    audioContext: null,
    soundMeter: null,
    meterRefreshInverval: null,
  };

  mediaStreamConstraints: MediaStreamConstraints = {
    video: false,
    audio: true,
  };

  updateStatus(status: string) {
    this.status = status;
    this.settings?.onStatusChange(status);
  }

  async init(settings: Peer2PeerSettings) {
    this.settings = settings;

    await this.startLocalAudioStream();

    const { localUserId } = settings;

    const Peer = await import("peerjs");
    this.peer = new Peer.default(localUserId);
    console.log(`Registered ${localUserId} for PeerServerCloud`);

    this.peer.on("call", async (call: any) => {
      console.log(`Receiving call from ${call.peer}`);
      this.updateStatus("RECEIVING_CALL");

      try {
        call.answer(this.localStream);
        call.on("stream", (remoteStream: MediaStream) => {
          const remoteUserVideo = this.getVideoElement(call.peer);
          remoteUserVideo.srcObject = remoteStream;
          console.log(`Accepting call from ${call.peer} successfully`);
          this.updateStatus("CONNECTED");
          this.settings?.onRemoteMediaStreamed(call.peer);
        });
      } catch (error) {
        console.error(`Accepting call from ${call.peer} failed`, error);
      }
    });

    this.peer.on("open", () => {
      this.updateStatus("OPEN");
    });

    //The callee receive data channel connection
    // this.peer.on("connection", (conn: any) => {
    //   this.updateStatus("CONNECTION");
    //   conn.on("data", (data: ISocketIOMessage) => {
    //     if (this.settings) {
    //       this.settings.onDataChannelReceived(data);
    //     }
    //   });
    // });

    this.peer.on("disconnected", () => {
      this.updateStatus("DISCONNECTED");
    });

    this.peer.on("error", (error: any) => {
      this.updateStatus("ERROR");
      console.error("Peer2Peer:Error", error);
    });

    this.peer.on("close", () => {
      this.updateStatus("CLOSED");
    });
  }

  callRemotePeer(remoteId: string) {
    console.log(`Calling to ${remoteId}`);
    this.updateStatus("CALLING");

    const call = this.peer.call(remoteId, this.localStream);
    call.on("stream", (remoteStream: MediaStream) => {
      const remoteUserVideo = this.getVideoElement(remoteId as string);
      remoteUserVideo.srcObject = remoteStream;
      console.log(`Render remote stream for ${remoteId} successfully`);
      this.updateStatus("CONNECTED");
      this.settings?.onRemoteMediaStreamed(remoteId);

      // const conn = this.peer.connect(remoteId, { serialization: "json" });
      // conn.on("data", (data: ISocketIOMessage) => {
      //   if (this.settings) {
      //     this.settings.onDataChannelReceived(data);
      //   }
      // });
    });
  }

  startLocalAudioStream = async () => {
    console.log("startLocalAudioStream");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      this.localStream = stream;

      // this.connectSoundMeter(stream);

      const localUserVideo = this.getVideoElement(
        this.settings?.localUserId as string
      );
      localUserVideo.srcObject = this.localStream;

      const [audioTrack] = stream.getAudioTracks();
      console.log(
        "Start local audio stream successfully using mic: " + audioTrack.label
      );

      this.settings?.onLocalMediaStreamed();
    } catch (error: unknown) {
      this.handleGetUserMediaError(error, "mic");
    }
  };

  upgradeToVideoStream = async () => {
    console.log("upgradeToVideoStream");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });

      const [videoTrack] = stream.getVideoTracks();
      if (this.localStream) {
        this.localStream.addTrack(videoTrack);
      }

      // const audioTracks = stream.getAudioTracks();
      // this.localStream.addTrack(audioTracks[0]);

      //========Sound Meter Connection
      // this.connectSoundMeter(this.localStream);
      //========

      const localUserVideo = this.getVideoElement(
        this.settings?.localUserId as string
      );

      localUserVideo.srcObject = null;
      localUserVideo.srcObject = this.localStream;

      this.reConnectAllRemotePeers();

      if (this.settings) {
        this.settings.camOnOnce = true;
      }

      console.log(
        "Upgrade local to video stream successfully using cam: " +
          videoTrack.label
      );
    } catch (error: unknown) {
      this.handleGetUserMediaError(error, "cam");
    }
  };

  toggleLocalVideoStream = () => {
    console.log("toggleLocalVideoStream");
    if (this.localStream) {
      const [track] = this.localStream.getVideoTracks();
      if (track) {
        const fromStatus = track.enabled ? "on" : "off";
        const toStatus = !track.enabled ? "on" : "off";

        track.enabled = !track.enabled;
        // track.stop();
        console.log(
          `Toggle video stream success from ${fromStatus} to ${toStatus}`
        );
      } else {
        console.error(
          "Toggle video stream failed: local video track not found"
        );
      }
    } else {
      console.error("Toggle video stream failed: local stream not found");
    }
  };

  toggleLocalAudioStream = () => {
    console.log("toggleLocalAudioStream");
    if (this.localStream) {
      const [track] = this.localStream.getAudioTracks();
      if (track) {
        const fromStatus = track.enabled ? "on" : "off";
        const toStatus = !track.enabled ? "on" : "off";

        track.enabled = !track.enabled;

        const { soundMeter, audioContext } = this.micProcesser;
        if (track.enabled) {
          if (soundMeter && audioContext) {
            soundMeter.script.connect(audioContext.destination);
            console.log("Sound meter is connected");
          }
        } else {
          if (soundMeter) {
            soundMeter.script.disconnect();
            console.log("Sound meter is disconnected");
          }
        }

        //TODO: need to re-test whether it use property enabled or muted
        // track.stop();
        console.log(
          `Toggle audio stream success from ${fromStatus} to ${toStatus}`
        );
      } else {
        console.error(
          "Toggle audio stream failed: local audio track not found"
        );
      }
    } else {
      console.error("Toggle audio stream failed: local stream not found");
    }
  };

  reConnectAllRemotePeers = () => {
    for (let connectionId in this.peer.connections) {
      this.callRemotePeer(connectionId);
    }
  };

  disconnect = () => {
    this.peer.destroy();
    this.peer = null;
    if (this.localStream) {
      this.localStream.getTracks().forEach((track) => track.stop());
      this.localStream = null;
    }

    const { soundMeter, audioContext } = this.micProcesser;
    if (soundMeter && audioContext) {
      soundMeter.stop();
      audioContext.close();
    }

    this.events.removeAllListeners();
  };

  notifySpeakViaAllConnectedDataChannels = (speaking: boolean) => {
    const data: ISocketIOMessage = {
      type: speaking
        ? SessionsGatewayEventCode.SPEAK_ON
        : SessionsGatewayEventCode.SPEAK_OFF,
      message: ``,
      payload: {
        userId: this.settings?.localUserId,
      },
    };

    for (let connectionId in this.peer.connections) {
      const connectionChannels = this.peer.connections[connectionId];
      const dataChannel = (connectionChannels as Array<any>).find(
        (conn: any) => conn.type === "data" && conn.open === true
      );

      if (dataChannel) {
        dataChannel._dc.send(JSON.stringify(data));
      }
    }
  };

  private connectSoundMeter = (stream: MediaStream) => {
    this.micProcesser.audioContext = new AudioContext();
    console.log("sample rate: " + this.micProcesser.audioContext.sampleRate);
    this.micProcesser.soundMeter = new SoundMeter(
      this.micProcesser.audioContext,
      this.notifySpeak
    );
    this.micProcesser.soundMeter.connectToSource(stream);
  };

  private notifySpeak = (volume: number) => {
    this.events.emit("speak", volume);
  };

  private getVideoElement = (peerId: string) => {
    return document.getElementById(`video-${peerId}`) as HTMLVideoElement;
  };

  private handleGetUserMediaError = (error: unknown, type: string) => {
    if (error instanceof DOMException) {
      if (
        error.name === "NotAllowedError" ||
        error.name === "PermissionDeniedError"
      ) {
        // Handle permission denied error
        if (error.name === "NotAllowedError") {
          console.log("NotAllowedError: Rejected by you?");
          this.settings?.onMediaPermissionRejected(type);
        } else if (error.name === "PermissionDeniedError") {
          console.log("PermissionDeniedError: Rejected by browser?");
        }
        throw new PermissionNotAllowed(error.message);
      }
    } else {
      // Handle other generic error that is not related to browser API
    }
  };
}

export default Peer2Peer;
