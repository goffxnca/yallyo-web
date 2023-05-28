import { async } from "@firebase/util";
import { useEffect } from "react";

const AgoraSignal = () => {
  useEffect(() => {
    console.log("window", window);

    const initAgora = async () => {
      if (window) {
        //   const xxx = import  from "agora-rtm-sdk";
        const AgoraRTM = await import("agora-rtm-sdk"); // Dynamic import
        // Params for login
        let options = {
          uid: Math.random(), //userId
          token: "",
        };
        // Your app ID
        const appID = "6565e143461f4ffc802f17e7bca473e3";
        // Your token
        // options.token = "<Your token>";

        // Initialize client
        const client = AgoraRTM.default.createInstance(appID);

        ////========================= DIRECT P2P SITUATION ===================
        // Client Event listeners
        // Display messages from peer
        client.on("MessageFromPeer", function (message, peerId) {
          document
            .getElementById("log")!
            .appendChild(document.createElement("div"))
            .append("Message from: " + peerId + " Message: " + message);
        });
        // Display connection state changes
        client.on("ConnectionStateChanged", function (state, reason) {
          document
            .getElementById("log")!
            .appendChild(document.createElement("div"))
            .append("State changed To: " + state + " Reason: " + reason);
        });

        // document.getElementById("login")!.onclick = async function () {
        //   options.uid =
        //     ((document.getElementById("userID") as any)?.value as number) || 0;
        //   await client.login(options);
        // };
        // logout
        document.getElementById("logout")!.onclick = async function () {
          await client.logout();
        };

        // send peer-to-peer message
        document.getElementById("send_peer_message")!.onclick =
          async function () {
            let peerId = (
              document.getElementById("peerId")! as HTMLInputElement
            ).value.toString();
            let peerMessage = (
              document.getElementById("peerMessage")! as HTMLInputElement
            ).value.toString();
            await client
              .sendMessageToPeer({ text: peerMessage }, peerId)
              .then((sendResult) => {
                if (sendResult.hasPeerReceived) {
                  document
                    .getElementById("log")!
                    .appendChild(document.createElement("div"))
                    .append(
                      "Message has been received by: " +
                        peerId +
                        " Message: " +
                        peerMessage
                    );
                } else {
                  document
                    .getElementById("log")!
                    .appendChild(document.createElement("div"))
                    .append(
                      "Message sent to: " + peerId + " Message: " + peerMessage
                    );
                }
              });
          };

        //================= BOARDCASTING SITUATION, NEED CREATEING/JOINGING ROOM============
        let channel = client.createChannel("demoChannel"); //roomId
        channel.on("ChannelMessage", function (message, memberId) {
          document
            .getElementById("log")!
            .appendChild(document.createElement("div"))
            .append(
              "Message received from: " + memberId + " Message: " + message
            );
        });
        // Display channel member stats
        channel.on("MemberJoined", function (memberId) {
          document
            .getElementById("log")!
            .appendChild(document.createElement("div"))
            .append(memberId + " joined the channel");
        });
        // Display channel member stats
        channel.on("MemberLeft", function (memberId) {
          document
            .getElementById("log")!
            .appendChild(document.createElement("div"))
            .append(memberId + " left the channel");
        });
        // Button behavior
        // Buttons
        // login

        // create and join channel
        document.getElementById("join")!.onclick = async function () {
          // Channel event listeners
          // Display channel messages
          await channel.join().then(() => {
            document
              .getElementById("log")!
              .appendChild(document.createElement("div"))
              .append(
                "You have successfully joined channel " + channel.channelId
              );
          });
        };
        // leave channel
        document.getElementById("leave")!.onclick = async function () {
          if (channel != null) {
            await channel.leave();
          } else {
            console.log("Channel is empty");
          }
        };

        // send channel message
        document.getElementById("send_channel_message")!.onclick =
          async function () {
            let channelMessage = (
              document.getElementById("channelMessage") as HTMLInputElement
            ).value.toString();
            if (channel != null) {
              await channel.sendMessage({ text: channelMessage }).then(() => {
                document
                  .getElementById("log")!
                  .appendChild(document.createElement("div"))
                  .append(
                    "Channel message: " +
                      channelMessage +
                      " from " +
                      channel.channelId
                  );
              });
            }
          };
      }
    };

    initAgora();
  }, []);
  return (
    <>
      <div className="bg-white">
        <h1 className="left-align">
          <div data-k="MESS" /> Quickstart
        </h1>
        <form id="loginForm">
          <div className="col" style={{ minWidth: 433, maxWidth: 443 }}>
            <div className="card" style={{ marginTop: 0, marginBottom: 0 }}>
              <div
                className="row card-content"
                style={{ marginBottom: 0, marginTop: 10 }}
              >
                <div className="input-field">
                  <label>User ID</label>
                  <input type="text" placeholder="User ID" id="userID" />
                </div>
                <div className="row">
                  <div>
                    <button type="button" id="login">
                      LOGIN
                    </button>
                    <button type="button" id="logout">
                      LOGOUT
                    </button>
                  </div>
                </div>
                <div className="input-field">
                  <label>Channel name: demoChannel</label>
                </div>
                <div className="row">
                  <div>
                    <button type="button" id="join">
                      JOIN
                    </button>
                    <button type="button" id="leave">
                      LEAVE
                    </button>
                  </div>
                </div>
                <div className="input-field channel-padding">
                  <label>Channel Message</label>
                  <input
                    type="text"
                    placeholder="channel message"
                    id="channelMessage"
                  />
                  <button type="button" id="send_channel_message">
                    SEND
                  </button>
                </div>
                <div className="input-field">
                  <label>Peer Id</label>
                  <input type="text" placeholder="peer id" id="peerId" />
                </div>
                <div className="input-field channel-padding">
                  <label>Peer Message</label>
                  <input
                    type="text"
                    placeholder="peer message"
                    id="peerMessage"
                  />
                  <button type="button" id="send_peer_message">
                    SEND
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>

        <div id="log"></div>
      </div>
    </>
  );
};

export default AgoraSignal;
