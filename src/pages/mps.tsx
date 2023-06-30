import { createNArray } from "@/utils/array-utils";
import { useCallback, useEffect, useState } from "react";

import { RootState, AppDispatch } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import Peer2Peer from "@/hooks/Peer2Peer";
import { subscribeSessionsUpdates } from "@/libs/ws-subscriptions";
import { Socket } from "socket.io-client";
import { fetchPeersAsync, removePeerLoading } from "@/store/sessionSlice";
import {
  IRoomPeer,
  ISocketIOMessage,
  SessionsGatewayEventCode,
} from "@/types/common";
import SessionControlList from "@/components/Session/SessionControlList";
import VideoStreamItem from "@/components/Session/VideoStreamItem";
import PreviewScreen from "@/components/Session/PreviewScreen";

let p2p: Peer2Peer;
let sessionsSocket: Socket;

const MultiplePeers = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const { peers } = useSelector((state: RootState) => state.session);

  const router = useRouter();

  const [peerStatus, setPeerStatus] = useState("");
  const [roomCode, setRoomCode] = useState("");
  const [localPeerData, setLocalPeerData] = useState<IRoomPeer>();
  const [initilizedOnce, setInitializedOnce] = useState(false);
  const [showPreviewScreen, setShowPreviewScreen] = useState(true);

  const dispatch: AppDispatch = useDispatch();

  const initRoomSession = useCallback(async () => {
    console.log("Initializing room session");

    p2p = new Peer2Peer();
    await p2p.init({
      localUserId: user?.uid as string,
      remoteUserId: "",
      onStatusChange: setPeerStatus,
      onLocalVideoStreamed: () => {
        sessionsSocket = subscribeSessionsUpdates(
          roomCode as string,
          user!,
          dispatch,
          {
            onConnected: () => {},
            onJoin: (joiner: IRoomPeer) => {
              if (p2p.settings) {
                p2p.settings.remoteUserId = joiner.userId;
              }

              setTimeout(() => {
                p2p.callRemotePeer(joiner.userId);
              }, 2000);
            },
            onLeave: () => {},
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
      onMediaPermissionRejected: () => {},
      onDataChannel: () => {},
    });

    setInitializedOnce(true);
  }, [dispatch, roomCode, user]);

  useEffect(() => {
    const { roomId } = router.query;
    if (roomId) {
      setRoomCode(roomId as string);
    }
  }, [router.query]);

  useEffect(() => {
    console.log("111111111==========");
    if (user && roomCode && !showPreviewScreen && !initilizedOnce) {
      console.log("222222222??????==========");
      initRoomSession();
    }
  }, [user, roomCode, showPreviewScreen, initilizedOnce, initRoomSession]);

  useEffect(() => {
    if (peerStatus) {
      console.log("Peer connection status is now: ", peerStatus);
    }
  }, [peerStatus]);

  useEffect(() => {
    if (user && peers.length > 0) {
      const myPeerInfo = peers.find((peer) => peer.userId === user?.uid);
      setLocalPeerData(myPeerInfo);
    }
  }, [user, peers]);

  useEffect(() => {
    return () => {
      if (sessionsSocket) {
        alert("clean sessionsSocket");
        sessionsSocket.disconnect();
      }
      if (p2p.peer) {
        alert("clean p2p");
        p2p.disconnect();
      }
    };
  }, []);

  if (!user) {
    return <div className="text-white">Auth Required</div>;
  }

  if (showPreviewScreen) {
    return (
      <PreviewScreen
        onPreviewFinished={() => {
          setShowPreviewScreen(false);
        }}
      />
    );
  }

  return (
    <div>
      <div className="text-white">{peerStatus}</div>
      {/* <div className="text-white">{JSON.stringify(joiners)}</div> */}

      {localPeerData && (
        <SessionControlList
          controls={localPeerData.controls}
          onToggleMic={(current: boolean) => {
            const data: ISocketIOMessage = {
              type: current
                ? SessionsGatewayEventCode.MIC_OFF
                : SessionsGatewayEventCode.MIC_ON,
              message: `User ${user.uid} turned mic ${current ? "off" : "on"}`,
              payload: localPeerData?.socketId,
            };
            sessionsSocket.emit("clientMessage", data);
            p2p.toggleAudioStream();
          }}
          onToggleCam={(current: boolean) => {
            const data: ISocketIOMessage = {
              type: current
                ? SessionsGatewayEventCode.CAM_OFF
                : SessionsGatewayEventCode.CAM_ON,
              message: `User ${user.uid} turned camara ${
                current ? "off" : "on"
              }`,
              payload: localPeerData?.socketId,
            };
            sessionsSocket.emit("clientMessage", data);
            p2p.toggleVideoStream();
          }}
        />
      )}

      <pre className="text-white text-xs">
        {/* {JSON.stringify(
          peers.map((peer) => ({
            socketId: peer.socketId,
            roomId: peer.roomId,
            userId: peer.userId,
            status: peer.status,
            dname: peer.dname,
          })),
          null,
          2
        )} */}
        {/* {JSON.stringify(peers, null, 2)} */}
      </pre>
      <div className="flex justify-center my-4">
        <ul className="flex gap-2 flex-wrap justify-center max-w-[1400px]">
          <VideoStreamItem
            userId={user.uid}
            status={localPeerData?.status!}
            displayName={localPeerData?.userInfo.dname!}
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
                  displayName={peer.userInfo.dname}
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
