import SessionControlList from "@/components/Session/SessionControlList";

import {
  IRoomPeer,
  ISocketIOMessage,
  SessionsGatewayEventCode,
} from "@/types/common";

import { joinClasses } from "@/utils/jsx-utils";
import { useCallback, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { Socket } from "socket.io-client";
import Peer2Peer from "@/hooks/Peer2Peer";
import JoinerItemCool from "./JoinerItemCool";

import SessionChatSidebar from "./SessionChatSidebar/SessionChatSidebar";

interface Props {
  sessionsSocket: Socket;
  p2p: Peer2Peer;
}

const GAP_PX = 8;

const SessionContainer = ({ sessionsSocket, p2p }: Props) => {
  // console.log("SessionContainer");

  const { user } = useSelector((state: RootState) => state.auth);
  const { peers, localControls } = useSelector(
    (state: RootState) => state.session
  );

  const [localPeerData, setLocalPeerData] = useState<IRoomPeer>();
  const [amISpeaking, setAmISpeaking] = useState(false);

  useEffect(() => {
    if (user && peers.length > 0) {
      const myPeerInfo = peers.find((peer) => peer.userId === user.uid);
      setLocalPeerData(myPeerInfo);
    }
  }, [user, peers]);

  useEffect(() => {
    if (p2p) {
      let timeout: NodeJS.Timeout;
      const speakHandler = (volume: number) => {
        if (timeout) {
          clearTimeout(timeout);
        }
        setAmISpeaking(true);
        timeout = setTimeout(() => {
          setAmISpeaking(false);
        }, 2000);
      };

      p2p.events.on("speak", speakHandler);

      return () => {
        p2p.events.off("speak", speakHandler);
      };
    }
  }, [p2p]);

  useEffect(() => {
    if (p2p && p2p.peer) {
      p2p.notifySpeakViaAllConnectedDataChannels(amISpeaking);
    }
  }, [amISpeaking, p2p]);

  const [screen, setScreen] = useState({ width: 0, height: 0, layout: "" });
  const [boxSize, setBoxSize] = useState("0px");

  const calculateBoxSize = useCallback((total: number) => {
    //We try to treat peer length zero or one the same, so we avoid blinky joiner box
    const totalIsZeroOrOne = total === 0 || total === 1;
    const { innerWidth, innerHeight } = window;
    const layout = innerWidth > innerHeight ? "lanscape" : "portrait";

    let finalBoxSize = 0;
    if (innerWidth >= 1280) {
      //lg
      if (layout === "lanscape") {
        finalBoxSize = totalIsZeroOrOne ? innerHeight / 2 : innerHeight / 3;
      } else {
        finalBoxSize = totalIsZeroOrOne ? innerWidth / 2 : innerWidth / 4;
      }
    } else if (innerWidth >= 1024) {
      //lg
      if (layout === "lanscape") {
        finalBoxSize = totalIsZeroOrOne ? innerHeight / 2 : innerHeight / 3;
      } else {
      }
    } else if (innerWidth >= 768) {
      //md
      finalBoxSize = totalIsZeroOrOne
        ? innerWidth
        : total === 2
        ? innerWidth / 2
        : innerWidth / 3;
    } else {
      //sm
      finalBoxSize = totalIsZeroOrOne
        ? innerWidth
        : total === 2
        ? innerWidth / 1.5
        : innerWidth / 2 - GAP_PX;
    }
    setBoxSize(finalBoxSize + "px");
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined" && window.navigator) {
      const { innerWidth, innerHeight } = window;
      setScreen({
        width: innerWidth,
        height: innerHeight,
        layout: innerWidth > innerHeight ? "lanscape" : "portrait",
      });

      calculateBoxSize(peers.length);
    }
  }, [peers.length, calculateBoxSize]);

  // if (!user || !peers.length) {
  //   return <div className="text-white">Nothing</div>;
  // }

  return (
    <div className="relative lg:flex">
      <div className="relative flex-grow">
        {/* <div className="text-white absolute right-0 bottom-0">{boxSize}</div> */}

        {/* <div className="text-white absolute bottom-0 left-0">
          {JSON.stringify(screen)}
        </div> */}

        {/* <div className="flex flex-col md:flex-row md:flex-wrap md:content-center items-center justify-center h-screen bg-gray-500"> */}
        <div
          className={joinClasses(
            //   joiners <= 2
            //     ? "flex flex-col md:flex-row md:flex-wrap "
            //     : joiners <= 4
            //     ? "flex flex-row flex-wrap"
            //     : "flex flex-row flex-wrap",
            "h-screen bg-pramary "
          )}
        >
          <div
            className={`flex flex-row flex-wrap w-full h-full content-center items-center justify-center pt-[65px] max-w-screen-lg mx-auto`}
            style={{ height: screen.height }}
          >
            {localPeerData && (
              <SessionControlList
                controls={localPeerData.controls}
                onToggleMic={(current: boolean) => {
                  p2p.toggleLocalAudioStream();
                  setAmISpeaking(false);
                  const data: ISocketIOMessage = {
                    type: current
                      ? SessionsGatewayEventCode.MIC_OFF
                      : SessionsGatewayEventCode.MIC_ON,
                    message: `User ${user?.uid} turned mic ${
                      current ? "off" : "on"
                    }`,
                    payload: localPeerData?.socketId,
                  };
                  sessionsSocket.emit("clientMessage", data);
                }}
                onToggleCam={async (current: boolean) => {
                  const data: ISocketIOMessage = {
                    type: current
                      ? SessionsGatewayEventCode.CAM_OFF
                      : SessionsGatewayEventCode.CAM_ON,
                    message: `User ${user?.uid} turned camara ${
                      current ? "off" : "on"
                    }`,
                    payload: localPeerData?.socketId,
                  };

                  if (p2p.settings?.camOnOnce) {
                    p2p.toggleLocalVideoStream();
                    sessionsSocket.emit("clientMessage", data);
                  } else {
                    try {
                      await p2p.upgradeToVideoStream();
                      sessionsSocket.emit("clientMessage", data);
                    } catch (error: unknown) {
                      console.error(
                        "Peer2Peer.upgradeToVideoStream failed with error: " +
                          error
                      );
                    }
                  }

                  // p2p.upgradeLocalStream().then(() => {
                  // const toggleCamSuccess = p2p.toggleLocalVideoStream();
                  // if (toggleCamSuccess) {
                  //   alert("toggleCamSuccess");
                  //   const data: ISocketIOMessage = {
                  //     type: current
                  //       ? SessionsGatewayEventCode.CAM_OFF
                  //       : SessionsGatewayEventCode.CAM_ON,
                  //     message: `User ${user?.uid} turned camara ${
                  //       current ? "off" : "on"
                  //     }`,
                  //     payload: localPeerData?.socketId,
                  //   };
                  //   sessionsSocket.emit("clientMessage", data);
                  // }
                  // });
                }}
              />
            )}

            <div className="flex justify-center my-4">
              <ul className="flex gap-2 flex-wrap justify-center max-w-[1400px]">
                {/* <VideoStreamItem
          userId={user.uid}
          status={localPeerData?.status!}
          displayName={localPeerData?.dname!}
          controls={localPeerData?.controls!}
        /> */}

                <JoinerItemCool
                  userId={user?.uid!}
                  status={localPeerData?.status!}
                  displayName={user?.displayName!}
                  controls={localPeerData?.controls!}
                  boxSize={boxSize}
                  photoUrl={user?.photoURL!}
                  showStatusIndicator={true}
                  isMe={true}
                  speaking={amISpeaking}
                  muted={true}
                />

                {peers
                  .filter((peer) => peer.userId !== user?.uid)
                  .map((peer) => {
                    return (
                      // <VideoStreamItem
                      //   key={peer.socketId}
                      //   userId={peer.userId}
                      //   status={peer.status}
                      //   displayName={peer.dname}
                      //   controls={peer.controls}
                      // />

                      <JoinerItemCool
                        key={peer.socketId}
                        userId={peer.userId}
                        status={peer.status}
                        displayName={peer.userInfo.dname}
                        controls={peer.controls}
                        boxSize={boxSize}
                        photoUrl={peer.userInfo.photoURL}
                        showStatusIndicator={true}
                        isMe={false}
                        speaking={peer.controls.speaking}
                        muted={false}
                      />
                    );
                  })}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {localControls && localControls.chatOn && (
        <SessionChatSidebar sessionsSocket={sessionsSocket} />
      )}
    </div>
  );
};

export default SessionContainer;
