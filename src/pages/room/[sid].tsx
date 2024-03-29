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

import StaticLoadingScreen from "@/components/Session/StaticLoadingScreen";
import RoomNotFound from "@/components/Session/Errors/RoomNotFound";
import SessionContainer from "@/components/Session/SessionContainer";
import RoomInactive from "@/components/Session/Errors/RoomInactive";
import Modal from "@/components/UIs/Modal";
import TroubleshootingContent from "@/components/Session/TroubleshootingContent";
import { CustomError2, PermissionNotAllowed } from "@/types/errors";
import InputDevicesSettings from "@/components/Session/InputDevicesSettings";
import Head from "next/head";
import AuthGuardShowLoginModal from "@/components/Auths/AuthGuardShowLoginModal";

let p2p: Peer2Peer;
let sessionsSocket: Socket;

const RoomSessionPage = () => {
  // console.log("RoomSessionPage");

  const router = useRouter();

  const { user } = useSelector((state: RootState) => state.auth);
  const { room, inputDeviceSettings } = useSelector(
    (state: RootState) => state.session
  );

  const [peerStatus, setPeerStatus] = useState("");
  const [roomSid, setRoomSid] = useState("");
  const [roomId, setRoomId] = useState("");
  // const [initilizedOnce, setInitializedOnce] = useState(false);
  const [roomFetchedOnce, setRoomFetchedOnce] = useState(false);
  const [showStaticLoadingScreen, setShowStaticLoadingScreen] = useState(true); //This gonna always take 5 seconds static loading
  const [showDevicesSettingsModal, setShowDevicesSettingsModal] =
    useState(true);
  const [showTroubleshootingModal, setShowTroubleshootingModal] =
    useState<boolean>(false);
  const [mediaIssueType, setMediaIssueType] = useState("");

  const initilizedOnce = useRef(false);

  const dispatch: AppDispatch = useDispatch();

  const initRoomSession = useCallback(async () => {
    if (user && roomId) {
      // alert("initRoomSession");
      console.log("=========================");
      console.log("Initializing room session");

      p2p = new Peer2Peer();

      try {
        await p2p.init({
          localUserId: user?.uid as string,
          camOnOnce: false,
          deviceSettings: inputDeviceSettings,
          onStatusChange: setPeerStatus,
          onLocalMediaStreamed: () => {
            sessionsSocket = subscribeSessionsUpdates(
              roomId,
              user!,
              inputDeviceSettings,
              dispatch,
              {
                onConnected: () => {
                  setTimeout(() => {
                    dispatch(fetchPeersAsync(roomId)).then(() => {
                      console.log("Fetched peers");
                      dispatch(removePeerLoading(user?.uid as string));
                    });
                  }, 2000);
                },
                onJoin: (joiner: IRoomPeer) => {
                  setTimeout(() => {
                    p2p.callRemotePeer(joiner.userId);
                  }, 2000);
                },
                onLeave: (payload: any) => {
                  const { socketId, userId, dname } = payload;
                },
              }
            );
          },
          onRemoteMediaStreamed: (remoteId: string) => {
            dispatch(removePeerLoading(remoteId));
          },
          onMediaPermissionRejected: (type: string) => {
            setMediaIssueType(type);
            setShowTroubleshootingModal(true);
          },
          onDataChannelReceived: (data: ISocketIOMessage) => {
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
                  updateSpeakingStatus({
                    userId: payload.userId,
                    status: false,
                  })
                );
                break;

              default:
                break;
            }
          },
        });
        initilizedOnce.current = true;
      } catch (error: any) {
        if (error instanceof PermissionNotAllowed) {
          console.error("Peer2Peer.init failed with error: " + error);
        } else if (error instanceof CustomError2) {
          console.error("Peer2Peer.init failed with error: " + error);
        }
      }
    }
  }, [user, roomId, inputDeviceSettings, dispatch]);

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
    if (
      user &&
      room &&
      !initilizedOnce.current &&
      !showStaticLoadingScreen &&
      !showDevicesSettingsModal
    ) {
      initRoomSession();
    }
  }, [
    user,
    room,
    showStaticLoadingScreen,
    showDevicesSettingsModal,
    initRoomSession,
  ]);

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

  if (showStaticLoadingScreen) {
    return (
      <StaticLoadingScreen
        onLoadingFinished={() => {
          setShowStaticLoadingScreen(false);
        }}
        closedInMs={3000}
      />
    );
  }

  if (!user) {
    return <AuthGuardShowLoginModal />;
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

  if (
    (room && room.joiners.length === room.size) ||
    room.createdBy === "AmGdO0ZIw71DV6Gy80mxkuG17acWf2"
  ) {
    return (window.location.href = "/feedback/room-full");
  }

  if (showDevicesSettingsModal) {
    return (
      <Modal
        emitClose={() => {
          window.location.href = "/feedback/devices-settings-rejected";
        }}
      >
        <InputDevicesSettings
          micRequired={room.features && room.features.audio}
          camRequired={room.features && room.features.video}
          onDevicesReady={() => {
            setShowDevicesSettingsModal(false);
          }}
        />
      </Modal>
    );
  }

  //TODO: More to check 1.Room is not full, 2.User medias permission match room requirements

  return (
    <>
      <Head>
        <title>
          {inputDeviceSettings && inputDeviceSettings.camId ? "Video" : "Voice"}
          Room: {room.topic}/{room.sid} | Yallyo.com
        </title>
        <meta
          name="description"
          content="Join Yallyo.com, the Global Platform for English Language Practice and Cultural Exchange. Connect with native English speakers and diverse language learners worldwide through voice and video calls, and engaging group chat rooms. Enhance your English fluency while making meaningful connections across borders. Join our international community and embark on a journey of learning and cultural understanding. Discover a new world of language practice and global friendships on Yallyo.com."
        />
        <meta name="robots" content="noindex, nofollow"></meta>
      </Head>

      <SessionContainer sessionsSocket={sessionsSocket} p2p={p2p} />
      {showTroubleshootingModal && (
        <Modal
          emitClose={() => {
            setShowTroubleshootingModal(false);
            setMediaIssueType("");
          }}
        >
          <TroubleshootingContent mediaType={mediaIssueType} />
        </Modal>
      )}
    </>
  );
};

export default RoomSessionPage;
