import { RefObject, useEffect, useState } from "react";
import _ from "lodash";
import { async } from "@firebase/util";
import { RtmClient } from "agora-rtm-sdk";

interface Props {
  userId: string;
}

const useSignalingServer = ({ userId }: Props) => {
  const [signalingClient, setSignalingClient] = useState<RtmClient>();

  const login = async () => {
    await signalingClient?.login(options);
  };

  let options = {
    uid: Math.random().toString(), //userId
    token: "",
  };

  useEffect(() => {
    const initAgora = async () => {
      if (window) {
        //   const xxx = import  from "agora-rtm-sdk";
        const AgoraRTM = await import("agora-rtm-sdk"); // Dynamic import
        // Params for login

        // Your app ID
        const appID = "6565e143461f4ffc802f17e7bca473e3";
        // Your token
        // options.token = "<Your token>";

        // Initialize client
        const client = AgoraRTM.default.createInstance(appID);
        setSignalingClient(client);

        ////========================= DIRECT P2P SITUATION ===================
        // Client Event listeners
        // Display messages from peer
        // client.on("MessageFromPeer", function (message, peerId) {
        //   document
        //     .getElementById("log")!
        //     .appendChild(document.createElement("div"))
        //     .append("Message from: " + peerId + " Message: " + message);
        // });
        // // Display connection state changes
        // client.on("ConnectionStateChanged", function (state, reason) {
        //   document
        //     .getElementById("log")!
        //     .appendChild(document.createElement("div"))
        //     .append("State changed To: " + state + " Reason: " + reason);
        // });

        // document.getElementById("login")!.onclick = async function () {
        //   options.uid = document.getElementById("userID")!.value;
        //   await client.login(options);
        // };
        // // logout
        // document.getElementById("logout")!.onclick = async function () {
        //   await client.logout();
        // };

        // // send peer-to-peer message
        // document.getElementById("send_peer_message")!.onclick =
        //   async function () {
        //     let peerId = (
        //       document.getElementById("peerId")! as HTMLInputElement
        //     ).value.toString();
        //     let peerMessage = (
        //       document.getElementById("peerMessage")! as HTMLInputElement
        //     ).value.toString();
        //     await client
        //       .sendMessageToPeer({ text: peerMessage }, peerId)
        //       .then((sendResult) => {
        //         if (sendResult.hasPeerReceived) {
        //           document
        //             .getElementById("log")!
        //             .appendChild(document.createElement("div"))
        //             .append(
        //               "Message has been received by: " +
        //                 peerId +
        //                 " Message: " +
        //                 peerMessage
        //             );
        //         } else {
        //           document
        //             .getElementById("log")!
        //             .appendChild(document.createElement("div"))
        //             .append(
        //               "Message sent to: " + peerId + " Message: " + peerMessage
        //             );
        //         }
        //       });
        //   };

        // //================= BOARDCASTING SITUATION, NEED CREATEING/JOINGING ROOM============
        // let channel = client.createChannel("demoChannel"); //roomId
        // channel.on("ChannelMessage", function (message, memberId) {
        //   document
        //     .getElementById("log")!
        //     .appendChild(document.createElement("div"))
        //     .append(
        //       "Message received from: " + memberId + " Message: " + message
        //     );
        // });
        // // Display channel member stats
        // channel.on("MemberJoined", function (memberId) {
        //   document
        //     .getElementById("log")!
        //     .appendChild(document.createElement("div"))
        //     .append(memberId + " joined the channel");
        // });
        // // Display channel member stats
        // channel.on("MemberLeft", function (memberId) {
        //   document
        //     .getElementById("log")!
        //     .appendChild(document.createElement("div"))
        //     .append(memberId + " left the channel");
        // });
        // // Button behavior
        // // Buttons
        // // login

        // // create and join channel
        // document.getElementById("join")!.onclick = async function () {
        //   // Channel event listeners
        //   // Display channel messages
        //   await channel.join().then(() => {
        //     document
        //       .getElementById("log")!
        //       .appendChild(document.createElement("div"))
        //       .append(
        //         "You have successfully joined channel " + channel.channelId
        //       );
        //   });
        // };
        // // leave channel
        // document.getElementById("leave")!.onclick = async function () {
        //   if (channel != null) {
        //     await channel.leave();
        //   } else {
        //     console.log("Channel is empty");
        //   }
        // };

        // // send channel message
        // document.getElementById("send_channel_message")!.onclick =
        //   async function () {
        //     let channelMessage = (
        //       document.getElementById("channelMessage") as HTMLInputElement
        //     ).value.toString();
        //     if (channel != null) {
        //       await channel.sendMessage({ text: channelMessage }).then(() => {
        //         document
        //           .getElementById("log")!
        //           .appendChild(document.createElement("div"))
        //           .append(
        //             "Channel message: " +
        //               channelMessage +
        //               " from " +
        //               channel.channelId
        //           );
        //       });
        //     }
        //   };
      }
    };

    initAgora();
  }, []);

  return { signalingClient, login };
};

export default useSignalingServer;
