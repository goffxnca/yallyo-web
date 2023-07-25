import { createNArray } from "@/utils/array-utils";
import { useEffect, useState } from "react";

import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import SignalingServer from "@/hooks/SignalingServer";
import { stat } from "fs";
import DarkOverlay from "@/components/Layouts/Overlay";

let connectPeer: any;
let signalingServer: SignalingServer | null;
let reconnect: any;
let targetPeerId: string;

const P2PPage = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const router = useRouter();

  const [peer, setPeer] = useState();
  const [status, setStatus] = useState("");

  useEffect(() => {
    // console.log("STATUS", status);
  }, [status]);

  useEffect(() => {
    if (typeof window !== "undefined" && user) {
      const init = async () => {
        // console.log("init...");
        const { query } = router;
        const { toid } = query;
        // console.log("toid", toid);
        const Peer = await import("peerjs");
        const peer = new Peer.default(user.uid);
        setPeer(peer as any);
        // console.log(peer);

        signalingServer = new SignalingServer();
        signalingServer.initAgola({
          roomId: "testroom",
          userId: user?.uid!,
          onJoin: (memberId: string) => {
            // console.log(`${memberId} =====YEAH JOINED====`);
            // createOffer();
            // alert("join by " + memberId);
            targetPeerId = memberId;
            connectPeer(memberId);
          },
          onAnswer: (offer: any) => {
            // console.log(`${memberId} =====YEAH JOINED====`);
            // createAnswer(offer);
          },
          onAcceptAnswer: (answer: any) => {
            // console.log(`${memberId} =====YEAH JOINED====`);
            // acceptAnswer(answer);
          },
          onIceCandidate: (iceCandidate: any) => {
            // console.log(`${memberId} =====YEAH JOINED====`);
            // if (peerConnection) {
            //   // alert("adding ice");
            //   peerConnection.addIceCandidate(iceCandidate);
            // }
          },
          onPeerLeft: () => {
            // alert("peer left");
            // resetPeerConnection();
            // initRoomSession();
            // remoteUserVideo.srcObject = null;
          },
        });

        peer.on("call", function (call: any) {
          setStatus("ANSWERING");
          navigator.mediaDevices
            .getUserMedia({ video: true, audio: true })
            .then(
              function (stream: any) {
                setStatus("CONNECTED");
                const localUserVideo = document.getElementById(
                  "localUser"
                ) as HTMLVideoElement;

                const remoteUserVideo = document.getElementById(
                  "remoteUser"
                ) as HTMLVideoElement;
                // console.log("videoElem", localUserVideo);
                localUserVideo.srcObject = stream;

                call.answer(stream); // Answer the call with an A/V stream.
                call.on("stream", function (remoteStream: any) {
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

        // on open will be launch when you successfully connect to PeerServer
        // conn.on("open", function () {
        //   // here you have conn.id
        //   console.log("open");
        //   conn.send("hi!");
        // });

        // peer.on("connection", function (conn: any) {
        //   conn.on("data", function (data: any) {
        //     // Will print 'hi!'
        //     console.log(data);
        //   });
        // });

        peer.on("open", () => {
          setStatus("OPEN");
        });

        peer.on("connection", () => {
          setStatus("CONNECTION");
        });

        peer.on("disconnected", () => {
          setStatus("DISCONNECTED");
        });

        peer.on("error", () => {
          setStatus("ERROR");
        });

        peer.on("close", () => {
          setStatus("CLOSED");
        });

        if (toid) {
          setTimeout(() => {
            document.getElementById("connect")?.click();
          }, 3000);
        }

        reconnect = () => {
          location.reload();
          //   connectPeer(targetPeerId);
        };

        connectPeer = (callId: string) => {
          setStatus("CALLING");

          navigator.mediaDevices
            .getUserMedia({ video: true, audio: true })
            .then(
              function (stream: any) {
                const call = peer.call(callId, stream);
                call.on("stream", function (remoteStream: any) {
                  setStatus("CONNECTED");
                  // Show stream in some video/canvas element.
                  const localUserVideo = document.getElementById(
                    "localUser"
                  ) as HTMLVideoElement;

                  const remoteUserVideo = document.getElementById(
                    "remoteUser"
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
        };
      };

      init();
      // Rest of your code that depends on the `navigator` object
    }
  }, [user]);

  return (
    <div>
      <button
        onClick={() => {
          reconnect();
        }}
        className="text-white"
        id="connect"
      >
        Re Connect
      </button>
      <div className="text-white">
        {status} {targetPeerId}
      </div>
      <div className="flex justify-center my-4">
        <ul className="flex gap-2 flex-wrap justify-center max-w-[1400px]">
          <div className="w-40 h-40 md:w-64 md:h-64 bg-secondary rounded-md">
            <video
              id="localUser"
              autoPlay
              playsInline
              style={{
                objectFit: "cover",
                width: "100%",
                height: "100%",
              }}
              className="rounded-md"
            />
          </div>

          <div className="w-40 h-40 md:w-64 md:h-64 bg-secondary rounded-md">
            {/* {true && (
                <div className="animate-pulse">
                  <ArrowPathIcon className="h-5 w-5 mr-2 animate-spin" />
                </div>
              )} */}

            <video
              id="remoteUser"
              autoPlay
              playsInline
              style={{
                objectFit: "cover",
                width: "100%",
                height: "100%",
              }}
              className="rounded-md"
            />
          </div>

          {createNArray(8).map((num) => (
            <div
              key={num}
              className="w-40 h-40 md:w-64 md:h-64 bg-secondary rounded-md"
            />
          ))}

          {status !== "CONNECTED" && <DarkOverlay />}
        </ul>
      </div>
    </div>
  );
};

export default P2PPage;
