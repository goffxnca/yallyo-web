import { ISoundMeterInterface, SoundMeter } from "@/libs/soundmeter";
import { ISocketIOMessage, SessionsGatewayEventCode } from "@/types/common";
import { EventEmitter } from "events";

interface Peer2PeerSettings {
  localUserId: string;
  camOnOnce: boolean;
  onStatusChange: Function;
  onLocalMediaStreamed: Function;
  onRemoteVideoStreamed: Function;
  onMediaPermissionRejected: Function;
  onDataChannel: Function;
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

  updateStatus(status: string) {
    this.status = status;
    this.settings?.onStatusChange(status);
  }

  async init(settings: Peer2PeerSettings) {
    this.settings = settings;

    await this.renderLocalMediaStream();

    const { localUserId } = settings;
    const Peer = await import("peerjs");
    // alert(`Registering user id: ${localUserId} on PeerServerCloud`);
    this.peer = new Peer.default(localUserId);
    console.log(`Registered ${localUserId} for PeerServerCloud`);

    //When remote peer recieving call
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
          this.settings?.onRemoteVideoStreamed(call.peer);
        });
      } catch (error) {
        console.error(`Accepting call from ${call.peer} failed`, error);
      }
    });

    this.peer.on("open", () => {
      this.updateStatus("OPEN");
    });

    //The callee receive data channel connection
    this.peer.on("connection", (conn: any) => {
      this.updateStatus("CONNECTION");
      conn.on("data", (data: ISocketIOMessage) => {
        if (this.settings) {
          this.settings.onDataChannel(data);
        }
      });
    });

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
      this.settings?.onRemoteVideoStreamed(remoteId);

      const conn = this.peer.connect(remoteId, { serialization: "json" });
      conn.on("data", (data: ISocketIOMessage) => {
        if (this.settings) {
          this.settings.onDataChannel(data);
        }
      });
    });
  }

  renderLocalMediaStream = async () => {
    console.log("Request browser mic permissions for local media stream");
    try {
      //Initially only voice call, can upgrade to camera later by user
      const stream = await navigator.mediaDevices.getUserMedia({
        video: false,
        audio: true,
      });
      this.localStream = stream;

      //========Sound Meter Connection
      this.connectSoundMeter(stream);
      //========

      const localUserVideo = this.getVideoElement(
        this.settings?.localUserId as string
      );
      localUserVideo.srcObject = stream;
      this.settings?.onLocalMediaStreamed();
      console.log("Render local stream successfully");
    } catch (error: unknown) {
      console.error("Render local stream failed", error);

      if (error instanceof DOMException) {
        if (
          error.name === "NotAllowedError" ||
          error.name === "PermissionDeniedError"
        ) {
          // Handle permission denied error
          // Show a message on the UI indicating that camera/microphone access is required
          if (error.name === "NotAllowedError") {
            // alert("NotAllowedError: You reject by yourself?");
            console.log("NotAllowedError: You reject by yourself?");
            this.settings?.onMediaPermissionRejected();
          } else if (error.name === "PermissionDeniedError") {
            // alert("PermissionDeniedError: Browser reject it?");
            console.log("PermissionDeniedError: Browser reject it?");
          }
        }
      } else {
        // Handle other generic error that is not related to browser API
      }
    }
  };

  toggleLocalVideoStream = () => {
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
    debugger;
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
          }
        } else {
          if (soundMeter) {
            alert("sound meter stopoped.");
            soundMeter.script.disconnect();
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

  upgradeLocalStream = async () => {
    console.log("Request browser cam permissions for local media stream");
    try {
      //Upgrade to camera media
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: true,
      });
      this.localStream = stream;
      debugger;
      const videoTracks = stream.getVideoTracks();
      this.localStream.addTrack(videoTracks[0]);

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

      // this.callAllConnectedRemotePeers();

      if (this.settings) {
        this.settings.camOnOnce = true;
      }

      console.log("Upgrade local stream successfully");
    } catch (error: unknown) {
      console.error("Render local stream failed", error);

      // if (error instanceof DOMException) {
      //   if (
      //     error.name === "NotAllowedError" ||
      //     error.name === "PermissionDeniedError"
      //   ) {
      //     // Handle permission denied error
      //     // Show a message on the UI indicating that camera/microphone access is required
      //     if (error.name === "NotAllowedError") {
      //       // alert("NotAllowedError: You reject by yourself?");
      //       console.log("NotAllowedError: You reject by yourself?");
      //       this.settings?.onMediaPermissionRejected();
      //     } else if (error.name === "PermissionDeniedError") {
      //       // alert("PermissionDeniedError: Browser reject it?");
      //       console.log("PermissionDeniedError: Browser reject it?");
      //     }
      //   }
      // } else {
      //   // Handle other generic error that is not related to browser API
      // }
    }
  };

  callAllConnectedRemotePeers = () => {
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
    //========Sound Meter Connection
    this.micProcesser.audioContext = new AudioContext();
    console.log("sample rate:" + this.micProcesser.audioContext.sampleRate);
    this.micProcesser.soundMeter = new SoundMeter(
      this.micProcesser.audioContext,
      this.notifySpeak
    );
    this.micProcesser.soundMeter.connectToSource(stream, (error: any) => {
      if (error) {
        console.error(
          "Connect local stream to Sound Meter failed with error:",
          error
        );
        return;
      }
    });
    //========
  };

  private notifySpeak = (volume: number) => {
    this.events.emit("speak", volume);
  };

  private getVideoElement = (peerId: string) => {
    return document.getElementById(`video-${peerId}`) as HTMLVideoElement;
  };
}

export default Peer2Peer;
