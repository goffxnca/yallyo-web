import { createNArray } from "@/utils/array-utils";
import { SetStateAction, useEffect, useState } from "react";

import { RootState, AppDispatch } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import Peer2Peer from "@/hooks/Peer2Peer";
import { subscribeSessionsUpdates } from "@/libs/ws-subscriptions";
import { Socket } from "socket.io-client";
import {
  fetchPeersAsync,
  removePeerLoading,
  toggleLocalCam,
  toggleLocalMic,
  toggleMic,
} from "@/store/sessionSlice";
import {
  IRoomPeer,
  ISocketIOMessage,
  SessionsGatewayEventCode,
} from "@/types/common";
import SessionControlList from "@/components/Session/SessionControlList";
import VideoStreamItem from "@/components/Session/VideoStreamItem";

let p2p: Peer2Peer;
let sessionsSocket: Socket;

interface IPeer {
  peerId: string;
  peerLocalId: string;
  peerRemoteId: string;
  //   peerObject: string;
  peerStatus: string;
}

const MultiplePeers = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const { peers } = useSelector((state: RootState) => state.session);
  const { controls } = useSelector((state: RootState) => state.session);

  const router = useRouter();

  const [status, setStatus] = useState("");
  const [roomCode, setRoomCode] = useState("");
  const [localPeerData, setLocalPeerData] = useState<IRoomPeer>();
  const [initilizedOnce, setInitializedOnce] = useState(false);

  const dispatch: AppDispatch = useDispatch();

  const initRoomSession = async () => {
    // alert("initRoomSession");
    console.log("Initializing room session");

    p2p = new Peer2Peer();
    await p2p.init({
      localUserId: user?.uid as string,
      remoteUserId: "",
      onStatusChange: setStatus,
      onLocalVideoStreamed: () => {
        sessionsSocket = subscribeSessionsUpdates(
          roomCode as string,
          user!,
          dispatch,
          (joiner: IRoomPeer) => {
            if (p2p.settings) {
              p2p.settings.remoteUserId = joiner.userId;
            }

            setTimeout(() => {
              p2p.callRemotePeer(joiner.userId);
            }, 2000);
          }
        );
        console.log("Subscribed /sessions");

        setTimeout(() => {
          dispatch(fetchPeersAsync(roomCode as string)).then(() => {
            dispatch(removePeerLoading(user?.uid as string));
          });
          console.log("Fetching peers");
        }, 1000);
      },
      onRemoteVideoStreamed: (remoteId: string) => {
        dispatch(removePeerLoading(remoteId));
      },
    });

    setInitializedOnce(true);
  };

  useEffect(() => {
    if (user && peers.length > 0) {
      const myPeerInfo = peers.find((peer) => peer.userId === user?.uid);
      setLocalPeerData(myPeerInfo);
    }
  }, [peers, user]);

  useEffect(() => {
    return () => {
      if (sessionsSocket) {
        alert("clean222");
        sessionsSocket.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    if (status) {
      console.log("Peer connection status is now: ", status);
    }
  }, [status]);

  useEffect(() => {
    // console.log("111111111==========");
    if (typeof window !== "undefined" && router && user) {
      //   console.log("222222222??????==========");
      const { query } = router;
      const { roomId } = query;

      if (roomId) {
        setRoomCode(roomId as string);
      }

      if (roomCode && !initilizedOnce) {
        initRoomSession();
        console.log("dd2222");
      }
    }
  }, [router, user, roomCode]);

  if (!user) {
    return <div className="text-white">Auth Required</div>;
  }
  return (
    <div>
      <div className="text-white">{status}</div>
      {/* <div className="text-white">{JSON.stringify(joiners)}</div> */}

      <SessionControlList
        onToggleMic={(current: boolean) => {
          const data: ISocketIOMessage = {
            type: current
              ? SessionsGatewayEventCode.MIC_OFF
              : SessionsGatewayEventCode.MIC_ON,
            message: `User ${user.uid} turned mic ${current ? "off" : "on"}`,
            payload: localPeerData?.socketId,
          };
          sessionsSocket.emit("clientMessage", data);
          dispatch(toggleLocalMic());
        }}
        onToggleCam={(current: boolean) => {
          const data: ISocketIOMessage = {
            type: current
              ? SessionsGatewayEventCode.CAM_OFF
              : SessionsGatewayEventCode.CAM_ON,
            message: `User ${user.uid} turned camara ${current ? "off" : "on"}`,
            payload: localPeerData?.socketId,
          };
          sessionsSocket.emit("clientMessage", data);
          p2p.toggleCam();
          dispatch(toggleLocalCam());
        }}
      />

      <pre className="text-white text-xs">
        Local Controls {JSON.stringify(controls)}
      </pre>

      <pre className="text-white text-xs">
        {JSON.stringify(
          peers.map((peer) => ({
            socketId: peer.socketId,
            roomId: peer.roomId,
            userId: peer.userId,
            status: peer.status,
            dname: peer.dname,
          })),
          null,
          2
        )}
        {/* {JSON.stringify(peers, null, 2)} */}
      </pre>
      <div className="flex justify-center my-4">
        <ul className="flex gap-2 flex-wrap justify-center max-w-[1400px]">
          <VideoStreamItem
            userId={user.uid}
            status={localPeerData?.status!}
            displayName={localPeerData?.dname!}
            controls={localPeerData?.controls!}
          />

          {peers
            .filter((peer) => peer.userId !== user.uid)
            .map((peer) => {
              return (
                <VideoStreamItem
                  key={peer.socketId}
                  userId={peer.userId}
                  status={peer.status}
                  displayName={peer.dname}
                  controls={peer.controls}
                />
              );
            })}
        </ul>
      </div>
    </div>
  );
};

export default MultiplePeers;
