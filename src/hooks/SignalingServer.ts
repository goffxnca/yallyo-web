import { RtmChannel, RtmClient } from "agora-rtm-sdk";

class SignalingServer {
  client: RtmClient | null = null;
  channel: RtmChannel | null = null;
  //   _onJoin: Function | null = null;
  constructor(
    roomId: string,
    userId: string,
    private onJoin: Function,
    private onAnswer: Function,
    private onAcceptAnswer: Function,
    private onIceCandidate: Function
  ) {
    this.initAgola(roomId, userId);
    // console.log(
    //   `RTM: SignalingServer init roomid: ${roomId}, userid: ${userId}`
    // );
  }

  private async initAgola(roomId: string, userId: string) {
    const self = this;

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
        self.onAnswer(offer);
      }

      if (type === "answer") {
        self.onAcceptAnswer(answer);
      }

      if (type === "candidate") {
        self.onIceCandidate(candidate);
      }
    });

    // // Display channel member stats

    this.channel.on("MemberJoined", function (memberId) {
      //   console.log(`RTM: ${memberId} joined channel ${roomId}`);
      alert(`${memberId} joined`);
      if (self && self.onJoin) {
        self.onJoin(memberId);
      }
    });
    // // Display channel member stats
    // channel.on("MemberLeft", function (memberId) {
    //   console.log(`RTM: ${memberId} left channel ${roomId}`);
    // });

    await this.channel.join();

    // setTimeout(async () => {
    //   await this.channel?.sendMessage({ text: "yoyo" });
    // }, 60000);
  }
}

export default SignalingServer;
