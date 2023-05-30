import { createNArray } from "@/utils/array-utils";
import { useEffect, useState } from "react";

import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import adapter from "webrtc-adapter";
import SignalingServer from "@/hooks/SignalingServer";
import DarkOverlay from "@/components/Layouts/Overlay";
import Peer2Peer from "@/hooks/Peer2Peer";

let signalingServer: SignalingServer | null;
let reconnect: any;
let targetPeerId: string;

const MultiplePeers = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const router = useRouter();

  const [peers, setPeers] = useState<Array<string>>([]);
  const [status, setStatus] = useState("");

  useEffect(() => {
    console.log("STATUS", status);
  }, [status]);

  useEffect(() => {
    if (typeof window !== "undefined" && user) {
      //   const { query } = router;
      //   const { id } = query;

      //   if (!id) {
      //     return;
      //   }

      const logMembers = async () => {
        const members = await signalingServer?.channel?.getMembers();
        setPeers(members?.map((member) => member as string) || []);
      };

      const init = async () => {
        console.log("init...");

        const p2p = new Peer2Peer();
        p2p.init({
          localUserId: user?.uid as string,
          remoteUserId: "",
          onStatusChange: setStatus,
        });

        // setPeers((prevState: string[]) => {
        //   return [...prevState, id as string];
        // });

        signalingServer = new SignalingServer();
        await signalingServer.initAgola({
          roomId: "testroom33333",
          userId: user?.uid as string,
          onJoin: async (memberId: string) => {
            // console.log(`${memberId} =====YEAH JOINED====`);
            // createOffer();
            // alert("join by " + memberId);
            targetPeerId = memberId;
            // setPeers((prevState: string[]) => {
            //   return [...prevState, memberId];
            // });

            if (p2p.settings) {
              p2p.settings.remoteUserId = memberId;
            }

            p2p.callRemotePeer(memberId);
            await logMembers();
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

        await logMembers();
        p2p.renderLocalStream();
      };

      reconnect = () => {
        location.reload();
        //   connectPeer(targetPeerId);
      };

      init();
      // Rest of your code that depends on the `navigator` object
    }
  }, [router, user]);

  if (!user) {
    return <div className="text-white">Auth Required</div>;
  }
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
      <div className="text-white">{status}</div>
      <div className="text-white">{JSON.stringify(peers)}</div>
      <div className="flex justify-center my-4">
        <ul className="flex gap-2 flex-wrap justify-center max-w-[1400px]">
          <div className="w-40 h-40 md:w-64 md:h-64 bg-secondary rounded-md">
            <div className="text-white">{user?.uid}</div>
            <video
              id={`video-${user?.uid}`}
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

          {peers
            .filter((p) => p !== user.uid)
            .map((peer) => {
              return (
                <div
                  key={peer}
                  className="w-40 h-40 md:w-64 md:h-64 bg-secondary rounded-md"
                >
                  <div className="text-white">{peer}</div>
                  <video
                    id={`video-${peer}`}
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
              );
            })}

          {/* {true && (
                <div className="animate-pulse">
                  <ArrowPathIcon className="h-5 w-5 mr-2 animate-spin" />
                </div>
              )} */}
          {/* <div className="w-40 h-40 md:w-64 md:h-64 bg-secondary rounded-md">
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
          </div> */}

          {/* {createNArray(8).map((num) => (
            <div
              key={num}
              className="w-40 h-40 md:w-64 md:h-64 bg-secondary rounded-md"
            />
          ))} */}

          {status !== "CONNECTED" && <DarkOverlay />}
        </ul>
      </div>
    </div>
  );
};

export default MultiplePeers;
