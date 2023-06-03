interface Peer2PeerSettings {
  localUserId: string;
  remoteUserId?: string;
  onStatusChange: Function;
  onLocalVideoStreamed: Function;
  onRemoteVideoStreamed: Function;
}

class Peer2Peer {
  peer: any = null;
  settings: Peer2PeerSettings | null = null;
  status: string = "";
  localStream: MediaStream | null = null;
  mediaStreamConstraints: MediaStreamConstraints = {
    video: true,
    audio: false,
  };

  setRemoteUserId(rid: string) {
    if (this.settings) {
      this.settings.remoteUserId = rid;
    }
  }

  updateStatus(status: string) {
    this.status = status;
    this.settings?.onStatusChange(status);
  }

  async init(settings: Peer2PeerSettings) {
    this.settings = settings;

    await this.renderLocalVideoStream();

    const { localUserId } = settings;
    const Peer = await import("peerjs");
    this.peer = new Peer.default(localUserId);
    console.log(`Registered ${localUserId} for PeerServerCloud`);

    //When remote peer recieving call
    this.peer.on("call", async (call: any) => {
      console.log(`Receiving call from ${call.peer}`);
      this.updateStatus("RECEIVING_CALL");

      try {
        const localStream = await navigator.mediaDevices.getUserMedia(
          this.mediaStreamConstraints
        );

        call.answer(localStream);
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

    this.peer.on("connection", () => {
      this.updateStatus("CONNECTION");
    });

    this.peer.on("disconnected", () => {
      this.updateStatus("DISCONNECTED");
    });

    this.peer.on("error", (error: any) => {
      this.updateStatus("ERROR");
      console.log("Peer2Peer:Error", error);
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
    });

    call.off("stream", () => {
      console.log("off");
    });
  }

  renderLocalVideoStream = async () => {
    console.log("Request browser permissions for local streaming");
    try {
      const stream = await navigator.mediaDevices.getUserMedia(
        this.mediaStreamConstraints
      );
      this.localStream = stream;

      const localUserVideo = this.getVideoElement(
        this.settings?.localUserId as string
      );
      localUserVideo.srcObject = stream;
      this.settings?.onLocalVideoStreamed();
      console.log("Render local stream successfully");
    } catch (error) {
      console.log("Render local stream failed", error);
    }
  };

  toggleCam = () => {
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
          `Toggle stream camera success from ${fromStatus} to ${toStatus}`
        );
      } else {
        console.error(
          "Toggle stream camera failed: local stream video track not found"
        );
      }
    } else {
      console.error("Toggle stream camera failed: local stream not found");
    }
  };

  private getVideoElement = (peerId: string) => {
    return document.getElementById(`video-${peerId}`) as HTMLVideoElement;
  };
}

export default Peer2Peer;
