import { RtmChannel, RtmClient } from "agora-rtm-sdk";

interface Peer2PeerSettings {
  //   roomId: string;
  localUserId: string;
  remoteUserId?: string;
  onStatusChange: Function;
  //   onJoin: Function;
  //   onAnswer: Function;
  //   onAcceptAnswer: Function;
  //   onIceCandidate: Function;
  //   onPeerLeft: Function;
}

class Peer2Peer {
  peer: any;

  client: RtmClient | null = null;
  channel: RtmChannel | null = null;
  settings: Peer2PeerSettings | null = null;

  setRemoteUserId(rid: string) {
    if (this.settings) {
      this.settings.remoteUserId = rid;
    }
  }

  async init(settings: Peer2PeerSettings) {
    this.settings = settings;

    const {
      localUserId,
      remoteUserId,
      onStatusChange,
      //   roomId,
      //   onJoin,
      //   onAnswer,
      //   onAcceptAnswer,
      //   onIceCandidate,
      //   onPeerLeft,
    } = settings;

    const Peer = await import("peerjs");

    this.peer = new Peer.default(localUserId);

    this.peer.on("call", function (call: any, xxx: any) {
      console.log("call", call);
      console.log("remoteUserId", remoteUserId);
      onStatusChange("ANSWERING");
      navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(
        function (stream: any) {
          onStatusChange("CONNECTED");
          const localUserVideo = document.getElementById(
            `video-${localUserId}`
          ) as HTMLVideoElement;

          call.answer(stream); // Answer the call with an A/V stream.
          call.on("stream", function (remoteStream: any) {
            const remoteUserVideo = document.getElementById(
              `video-${call.peer}`
            ) as HTMLVideoElement;
            // console.log("videoElem", localUserVideo);
            localUserVideo.srcObject = stream;

            // Show stream in some video/canvas element.
            remoteUserVideo.srcObject = remoteStream;
            console.log("remoteStream");
          });
        },
        function (err: any) {
          console.log("Failed to get local stream", err);
        }
      );
    });

    this.peer.on("open", () => {
      onStatusChange("OPEN");
    });

    this.peer.on("connection", () => {
      onStatusChange("CONNECTION");
    });

    this.peer.on("disconnected", () => {
      onStatusChange("DISCONNECTED");
    });

    this.peer.on("error", () => {
      onStatusChange("ERROR");
    });

    this.peer.on("close", () => {
      onStatusChange("CLOSED");
    });
  }

  callRemotePeer(callId: string) {
    this.settings?.onStatusChange("CALLING");
    const self = this;
    const {
      localUserId,
      remoteUserId,
      onStatusChange,
      //   roomId,
      //   onJoin,
      //   onAnswer,
      //   onAcceptAnswer,
      //   onIceCandidate,
      //   onPeerLeft,
    } = this.settings!;

    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(
      function (stream: any) {
        const call = self.peer.call(callId, stream);

        call.on("stream", function (remoteStream: any) {
          self.settings?.onStatusChange("CONNECTED");
          // Show stream in some video/canvas element.
          const localUserVideo = document.getElementById(
            `video-${localUserId}`
          ) as HTMLVideoElement;

          const remoteUserVideo = document.getElementById(
            `video-${remoteUserId}`
          ) as HTMLVideoElement;

          localUserVideo.srcObject = stream;
          remoteUserVideo.srcObject = remoteStream;
          console.log("got remote stream");
        });
      },
      function (err: any) {
        console.log("Failed to get local stream", err);
      }
    );
  }

  renderLocalStream = () => {
    const self = this;
    console.log("ddd", self.settings?.localUserId);
    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(
      function (stream: any) {
        const localUserVideo = document.getElementById(
          `video-${self.settings?.localUserId}`
        ) as HTMLVideoElement;
        localUserVideo.srcObject = stream;
      },

      function (err: any) {
        console.log("Failed to get local stream", err);
      }
    );
  };
}

export default Peer2Peer;
