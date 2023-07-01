import { useCallback, useEffect, useRef, useState } from "react";

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
  updateSpeakingStatus,
} from "@/store/sessionSlice";
import {
  IRoomPeer,
  ISocketIOMessage,
  SessionsGatewayEventCode,
} from "@/types/common";

import PreviewScreen from "@/components/Session/PreviewScreen";
import AuthRequired from "@/components/Session/Errors/AuthRequired";
import RoomNotFound from "@/components/Session/Errors/RoomNotFound";
import SessionContainer from "@/components/Session/SessionContainer";
import RoomInactive from "@/components/Session/Errors/RoomInactive";
import Modal from "@/components/UIs/Modal";
import TroubleshootingContent from "@/components/Session/TroubleshootingContent";

let p2p: Peer2Peer;
let sessionsSocket: Socket;

const RoomSessionPage = () => {
  console.log("RoomSessionPage");

  const router = useRouter();

  const { user } = useSelector((state: RootState) => state.auth);
  const { room } = useSelector((state: RootState) => state.session);

  const [peerStatus, setPeerStatus] = useState("");
  const [roomSid, setRoomSid] = useState("");
  const [roomId, setRoomId] = useState("");
  // const [initilizedOnce, setInitializedOnce] = useState(false);
  const [roomFetchedOnce, setRoomFetchedOnce] = useState(false);
  const [showPreviewScreen, setShowPreviewScreen] = useState(true); //This gonna always take 5 seconds static
  const [showTroubleshootingModal, setShowTroubleshootingModal] =
    useState<boolean>(false);

  const initilizedOnce = useRef(false);

  const dispatch: AppDispatch = useDispatch();

  const initRoomSession = useCallback(async () => {
    if (user && roomId) {
      // alert("initRoomSession");
      console.log("=========================");
      console.log("Initializing room session");

      p2p = new Peer2Peer();
      await p2p.init({
        localUserId: user?.uid as string,
        remoteUserId: "",
        onStatusChange: setPeerStatus,
        onLocalVideoStreamed: () => {
          sessionsSocket = subscribeSessionsUpdates(roomId, user!, dispatch, {
            onConnected: () => {
              console.log("Subscribed /sessions");
              setTimeout(() => {
                dispatch(fetchPeersAsync(roomId)).then(() => {
                  console.log("Fetched peers");
                  dispatch(removePeerLoading(user?.uid as string));
                });
              }, 2000);
            },
            onJoin: (joiner: IRoomPeer) => {
              if (p2p.settings) {
                p2p.settings.remoteUserId = joiner.userId;
              }

              setTimeout(() => {
                p2p.callRemotePeer(joiner.userId);
              }, 2000);
            },
            onLeave: (payload: any) => {
              const { socketId, userId, dname } = payload;
            },
          });
        },
        onRemoteVideoStreamed: (remoteId: string) => {
          dispatch(removePeerLoading(remoteId));
        },
        onMediaPermissionRejected: () => {
          setShowTroubleshootingModal(true);
        },
        onDataChannel: (data: ISocketIOMessage) => {
          console.log("onDataChannel with data", data);
          const { type, payload } = data;

          switch (type) {
            case SessionsGatewayEventCode.SPEAK_ON:
              dispatch(
                updateSpeakingStatus({ userId: payload.userId, status: true })
              );
              break;
            case SessionsGatewayEventCode.SPEAK_OFF:
              dispatch(
                updateSpeakingStatus({ userId: payload.userId, status: false })
              );
              break;

            default:
              break;
          }
        },
      });

      initilizedOnce.current = true;
    }
  }, [user, roomId, dispatch]);

  useEffect(() => {
    const { sid } = router.query;
    if (sid) {
      setRoomSid(sid as string);
    }
  }, [router.query]);

  useEffect(() => {
    if (user && roomSid) {
      dispatch(fetchSessionBySidAsync(roomSid)).finally(() => {
        setRoomFetchedOnce(true);
      });
    }
  }, [user, roomSid, dispatch]);

  useEffect(() => {
    if (room) {
      setRoomId(room._id);
    }
  }, [room]);

  useEffect(() => {
    if (user && room && !showPreviewScreen && !initilizedOnce.current) {
      initRoomSession();
    }
  }, [user, room, showPreviewScreen, initRoomSession]);

  useEffect(() => {
    if (peerStatus) {
      console.log("Peer connection status is now: ", peerStatus);
    }
  }, [peerStatus]);

  useEffect(() => {
    return () => {
      if (sessionsSocket) {
        // alert("clean sessionsSocket");
        sessionsSocket.disconnect();
      }
      if (p2p && p2p.peer) {
        // alert("clean p2p");
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
    return (
      <AuthRequired message="🔒 You need to login with Google Account to join this room." />
    );
  }

  if (!room) {
    if (roomFetchedOnce) {
      return <RoomNotFound />;
    } else {
      return null;
    }
  }

  if (room && !room.active) {
    return <RoomInactive />;
  }

  if (room && room.joiners.length === room.size) {
    return (window.location.href = "/feedback/room-full");
  }

  //TODO: More to check 1.Room is not full, 2.User medias permission match room requirements

  return (
    <>
      <SessionContainer sessionsSocket={sessionsSocket} p2p={p2p} />
      {showTroubleshootingModal && (
        <Modal
          emitClose={() => {
            setShowTroubleshootingModal(false);
          }}
        >
          <TroubleshootingContent />
        </Modal>
      )}
    </>
  );
};

export default RoomSessionPage;
