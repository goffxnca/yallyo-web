import { ISoundMeterInterface, SoundMeter } from "@/libs/soundmeter";
import { ISocketIOMessage, SessionsGatewayEventCode } from "@/types/common";
import { EventEmitter } from "events";

interface Peer2PeerSettings {
  localUserId: string;
  remoteUserId?: string;
  onStatusChange: Function;
  onLocalVideoStreamed: Function;
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

    await this.renderLocalVideoStream();

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
    const { remoteUserId } = this.settings!;
    console.log(`Calling to ${remoteUserId}`);
    this.updateStatus("CALLING");

    const call = this.peer.call(remoteId, this.localStream);
    call.on("stream", (remoteStream: MediaStream) => {
      const remoteUserVideo = this.getVideoElement(remoteUserId as string);
      remoteUserVideo.srcObject = remoteStream;
      console.log(`Render remote stream for ${remoteUserId} successfully`);
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

  renderLocalVideoStream = async () => {
    console.log("Request browser permissions for local streaming");
    try {
      const stream = await navigator.mediaDevices.getUserMedia(
        this.mediaStreamConstraints
      );
      this.localStream = stream;

      //========Test Sound Meter

      this.micProcesser.audioContext = new AudioContext();
      console.log("sample rate:" + this.micProcesser.audioContext.sampleRate);
      this.micProcesser.soundMeter = new SoundMeter(
        this.micProcesser.audioContext,
        this.notifySpeak
      );
      this.micProcesser.soundMeter.connectToSource(stream, (e: any) => {
        if (e) {
          alert(e);
          return;
        }

        console.log("connectToSource callback");

        // this.micProcesser.meterRefreshInverval = setInterval(() => {
        //   // instantMeter.value = instantValueDisplay.innerText =
        //   //   soundMeter.instant.toFixed(2);
        //   // slowMeter.value = slowValueDisplay.innerText =
        //   //   soundMeter.slow.toFixed(2);
        //   // clipMeter.value = clipValueDisplay.innerText = soundMeter.clip;
        //   console.log(
        //     "instantMeter",
        //     this.micProcesser.soundMeter?.instant.toFixed(2)
        //   );
        // }, 5000);
      });

      //========

      const localUserVideo = this.getVideoElement(
        this.settings?.localUserId as string
      );
      localUserVideo.srcObject = stream;
      this.settings?.onLocalVideoStreamed();
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
            alert("NotAllowedError: You reject by yourself?");
            this.settings?.onMediaPermissionRejected();
          } else if (error.name === "PermissionDeniedError") {
            alert("PermissionDeniedError: Browser reject it?");
          }
        }
      } else {
        // Handle other generic error that is not related to browser API
      }
    }
  };

  toggleVideoStream = () => {
    if (this.localStream) {
      console.log(
        "this.localStream.getVideoTracks()",
        this.localStream.getVideoTracks()
      );
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

  toggleAudioStream = () => {
    if (this.localStream) {
      console.log(
        "this.localStream.getAudioTracks()",
        this.localStream.getAudioTracks()
      );
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

  disconnect = () => {
    this.peer.destroy();
    this.peer = null;
    if (this.localStream) {
      this.localStream.getTracks().forEach((track) => track.stop());
      this.localStream = null;
    }

    const { soundMeter, audioContext } = this.micProcesser;
    if (soundMeter && audioContext) {
      alert("clean mic");
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

  private notifySpeak = (volume: number) => {
    this.events.emit("speak", volume);
  };

  private getVideoElement = (peerId: string) => {
    return document.getElementById(`video-${peerId}`) as HTMLVideoElement;
  };
}

export default Peer2Peer;
