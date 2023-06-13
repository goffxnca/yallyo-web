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

    this.peer.on("connection", () => {
      this.updateStatus("CONNECTION");
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
      console.error("Render local stream failed", error);
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
  };

  private getVideoElement = (peerId: string) => {
    return document.getElementById(`video-${peerId}`) as HTMLVideoElement;
  };
}

export default Peer2Peer;
