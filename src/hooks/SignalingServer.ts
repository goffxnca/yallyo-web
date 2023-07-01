import { RtmChannel, RtmClient } from "agora-rtm-sdk";

interface SignalingServerSettings {
  roomId: string;
  userId: string;
  onJoin: Function;
  onAnswer: Function;
  onAcceptAnswer: Function;
  onIceCandidate: Function;
  onPeerLeft: Function;
}

class SignalingServer {
  client: RtmClient | null = null;
  channel: RtmChannel | null = null;
  settings: SignalingServerSettings | null = null;

  async initAgola(settings: SignalingServerSettings) {
    this.settings = settings;

    const {
      userId,
      roomId,
      onJoin,
      onAnswer,
      onAcceptAnswer,
      onIceCandidate,
      onPeerLeft,
    } = settings;

    const options = {
      uid: userId,
      token: "",
    };

    const AgoraRTM = await import("agora-rtm-sdk"); // Dynamic import
    const appID = "6565e143461f4ffc802f17e7bca473e3";
    this.client = AgoraRTM.default.createInstance(appID);
    await this.client.login(options);

    this.channel = this.client.createChannel("doodoo"); //roomId
    this.channel.on("ChannelMessage", function (message, memberId) {
      const { type, offer, candidate, answer } = JSON.parse(message.text!);
      console.log(`RTM: ${memberId} boardcasted message: ${message.text}`);

      if (type === "offer") {
        onAnswer(offer);
      }

      if (type === "answer") {
        onAcceptAnswer(answer);
      }

      if (type === "candidate") {
        onIceCandidate(candidate);
      }
    });

    // // Display channel member stats

    this.channel.on("MemberJoined", function (memberId) {
      //   console.log(`RTM: ${memberId} joined channel ${roomId}`);
      // alert(`${memberId} joined`);
      onJoin(memberId);
    });
    // Display channel member stats
    const self = this;
    this.channel.on("MemberLeft", function (memberId) {
      onPeerLeft(memberId);
    });

    await this.channel.join();

    // setTimeout(async () => {
    //   await this.channel?.sendMessage({ text: "yoyo" });
    // }, 60000);
  }
}

export default SignalingServer;
