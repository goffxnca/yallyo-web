import { createNArray } from "@/utils/array-utils";
import { useCallback, useEffect, useState } from "react";

import { RootState, AppDispatch } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import Peer2Peer from "@/hooks/Peer2Peer";
import { subscribeSessionsUpdates } from "@/libs/ws-subscriptions";
import { Socket } from "socket.io-client";
import {
  fetchPeersAsync,
  fetchSessionAsync,
  removePeerLoading,
} from "@/store/sessionSlice";
import {
  IRoomPeer,
  ISocketIOMessage,
  SessionsGatewayEventCode,
} from "@/types/common";
import SessionControlList from "@/components/Session/SessionControlList";
import VideoStreamItem from "@/components/Session/VideoStreamItem";
import PreviewScreen from "@/components/Session/PreviewScreen";
import AuthRequired from "@/components/Session/Errors/AuthRequired";
import RoomNotFound from "@/components/Session/Errors/RoomNotFound";
import RoomIsFull from "@/components/Session/Errors/RoomIsFull";

let p2p: Peer2Peer;
let sessionsSocket: Socket;

const RoomSessionPage = () => {
  console.log("RoomSessionPage");
  const { user } = useSelector((state: RootState) => state.auth);
  const { room, localControls } = useSelector(
    (state: RootState) => state.session
  );
  const { peers } = useSelector((state: RootState) => state.session);

  const router = useRouter();

  const [peerStatus, setPeerStatus] = useState("");
  const [roomId, setRoomId] = useState("");
  const [localPeerData, setLocalPeerData] = useState<IRoomPeer>();
  const [initilizedOnce, setInitializedOnce] = useState(false);
  const [showPreviewScreen, setShowPreviewScreen] = useState(true);

  const dispatch: AppDispatch = useDispatch();

  const initRoomSession = useCallback(async () => {
    console.log("=========================");
    console.log("Initializing room session");

    p2p = new Peer2Peer();
    await p2p.init({
      localUserId: user?.uid as string,
      remoteUserId: "",
      onStatusChange: setPeerStatus,
      onLocalVideoStreamed: () => {
        sessionsSocket = subscribeSessionsUpdates(
          roomId,
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
          dispatch(fetchPeersAsync(roomId)).then(() => {
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
  }, [dispatch, roomId, user]);

  useEffect(() => {
    const { id } = router.query;
    if (id) {
      setRoomId(id as string);
    }
  }, [router.query]);

  useEffect(() => {
    if (user && roomId) {
      dispatch(fetchSessionAsync(roomId));
    }
  }, [user, roomId, dispatch]);

  useEffect(() => {
    if (user && room && !showPreviewScreen && !initilizedOnce) {
      initRoomSession();
    }
  }, [user, room, showPreviewScreen, initilizedOnce, initRoomSession]);

  useEffect(() => {
    if (peerStatus) {
      console.log("Peer connection status is now: ", peerStatus);
    }
  }, [peerStatus]);

  useEffect(() => {
    if (user && peers.length > 0) {
      const myPeerInfo = peers.find((peer) => peer.userId === user.uid);
      setLocalPeerData(myPeerInfo);
    }
  }, [user, peers]);

  useEffect(() => {
    return () => {
      if (sessionsSocket) {
        alert("clean sessionsSocket");
        sessionsSocket.disconnect();
      }
      if (p2p && p2p.peer) {
        alert("clean p2p");
        p2p.disconnect();
      }
    };
  }, []);

  if (showPreviewScreen) {
    return (
      <PreviewScreen
        onPreviewFinished={() => {
          setShowPreviewScreen(false);
        }}
      />
    );
  }

  if (!user) {
    return <AuthRequired />;
  }

  if (!room) {
    return <RoomNotFound />;
  }

  if (room && room.joiners.length === 3) {
    return <RoomIsFull />;
  }

  //TODO: More to check 1.Room is not full, 2.User medias permission match room requirements

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

export default RoomSessionPage;
