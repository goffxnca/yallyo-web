import { createNArray } from "@/utils/array-utils";
import { useEffect } from "react";

import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import adapter from "webrtc-adapter";
let peer: any;

const PeerPage = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const router = useRouter();

  const connectPeer = () => {
    const { query } = router;
    const { toid } = query;

    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(
      function (stream: any) {
        var call = peer.call(toid, stream);
        call.on("stream", function (remoteStream: any) {
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
  useEffect(() => {
    if (typeof window !== "undefined" && user) {
      const init = async () => {
        console.log("init...");
        const { query } = router;
        const { toid } = query;
        console.log("toid", toid);
        const Peer = await import("peerjs");
        peer = new Peer.default(user.uid);
        console.log(peer);

        var getUserMedia =
          (navigator as any).getUserMedia ||
          (navigator as any).webkitGetUserMedia ||
          (navigator as any).mozGetUserMedia;

        peer.on("call", function (call: any) {
          navigator.mediaDevices
            .getUserMedia({ video: true, audio: true })
            .then(
              function (stream: any) {
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

        peer.on("connection", function (conn: any) {
          conn.on("data", function (data: any) {
            // Will print 'hi!'
            console.log(data);
          });
        });

        if (toid) {
          setTimeout(() => {
            document.getElementById("connect")?.click();
          }, 3000);
        }
      };

      init();
      // Rest of your code that depends on the `navigator` object
    }
  }, [user]);

  return (
    <div>
      <button onClick={connectPeer} className="text-white" id="connect">
        {" "}
        Call
      </button>
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
        </ul>
      </div>
    </div>
  );
};

export default PeerPage;
