import { useCallback, useEffect, useState } from "react";

import { RootState, AppDispatch } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import Peer2Peer from "@/hooks/Peer2Peer";
import { subscribeSessionsUpdates } from "@/libs/ws-subscriptions";
import { Socket } from "socket.io-client";
import {
  fetchPeersAsync,
  fetchSessionBySidAsync,
  removePeerLoading,
} from "@/store/sessionSlice";
import { IRoomPeer } from "@/types/common";

import PreviewScreen from "@/components/Session/PreviewScreen";
import AuthRequired from "@/components/Session/Errors/AuthRequired";
import RoomNotFound from "@/components/Session/Errors/RoomNotFound";
import SessionContainer from "@/components/Session/SessionContainer";
import RoomInactive from "@/components/Session/Errors/RoomInactive";

let p2p: Peer2Peer;
let sessionsSocket: Socket;

const RoomSessionPage = () => {
  console.log("RoomSessionPage");

  const router = useRouter();

  const { user } = useSelector((state: RootState) => state.auth);
  const { room } = useSelector((state: RootState) => state.session);
  const { peers } = useSelector((state: RootState) => state.session);

  const [peerStatus, setPeerStatus] = useState("");
  const [roomSid, setRoomSid] = useState("");
  const [roomId, setRoomId] = useState("");
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
        sessionsSocket = subscribeSessionsUpdates(roomId, user!, dispatch, {
          onJoin: (joiner: IRoomPeer) => {
            if (p2p.settings) {
              p2p.settings.remoteUserId = joiner.userId;
            }

            setTimeout(() => {
              p2p.callRemotePeer(joiner.userId);
            }, 2000);
          },
          onLeave: () => {},
        });

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
    const { sid } = router.query;
    if (sid) {
      setRoomSid(sid as string);
    }
  }, [router.query]);

  useEffect(() => {
    if (user && roomSid) {
      dispatch(fetchSessionBySidAsync(roomSid));
    }
  }, [user, roomSid, dispatch]);

  useEffect(() => {
    if (room) {
      setRoomId(room._id);
    }
  }, [room]);

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

  if (!room.active) {
    return <RoomInactive />;
  }

  if (room.joiners.length === room.size) {
    return (window.location.href = "/feedback/room-full");
  }

  //TODO: More to check 1.Room is not full, 2.User medias permission match room requirements

  return (
    <SessionContainer
      user={user}
      peers={peers}
      sessionsSocket={sessionsSocket}
      p2p={p2p}
    />
  );
};

export default RoomSessionPage;
