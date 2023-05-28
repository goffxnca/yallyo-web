import { IRoomMessage } from "@/types/frontend";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { UsersIcon } from "@heroicons/react/24/outline";
import Button from "../Forms/Button";
import {
  createRoomMessage,
  subscribeRoomMessages,
} from "@/services/roomMessageService";
import SessionControlList from "./SessionControlList";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import SessionContent from "./SessionContent";
import SessionChatOverlayMobile from "./SessionChatOverlayMobile";
import SignalingServer from "@/hooks/SignalingServer";

let localStream: MediaStream | null;
let remoteStream: MediaStream | null;
let peerConnection: RTCPeerConnection | null;
let signalingServer: SignalingServer | null;
let servers: {
  iceServers: [
    { urls: ["stun:stun1.l.google.com:19302", "stun:stun2.l.google.com:19302"] }
  ];
};

const RoomSession = () => {
  const { room, controls } = useSelector((state: RootState) => state.session);
  const { user } = useSelector((state: RootState) => state.auth);

  // const [room, setRoom] = useState<Room | null>(null);
  const [roomId, setRoomId] = useState<string>("");
  const [roomMessages, setRoomMessages] = useState<IRoomMessage[]>([]);

  const toggleCam = () => {
    localStream?.getVideoTracks().forEach((track) => {
      track.enabled = !track.enabled;
      console.log(track);
    });
  };

  const toggleMic = () => {
    localStream?.getAudioTracks().forEach((track) => {
      track.enabled = !track.enabled;
      console.log(track);
    });
  };

  const resetPeerConnection = async () => {
    localStream = null;
    remoteStream = null;
    peerConnection = null;
    signalingServer = null;
  };

  const initRoomSession = async () => {
    peerConnection = new RTCPeerConnection(servers);
    // console.log("peerConnection", peerConnection);

    const localUserVideo = document.getElementById(
      "localUser"
    ) as HTMLVideoElement;
    const remoteUserVideo = document.getElementById(
      "remoteUser"
    ) as HTMLVideoElement;
    // console.log("videoElem", localUserVideo);

    try {
      //Live stream of local peer now
      localStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      // console.log("localStream", localStream);
      localUserVideo.srcObject = localStream;

      //Create reference stream first then will feed actual remote stream from peer2 to it soon
      remoteStream = new MediaStream();
      remoteUserVideo.srcObject = remoteStream;

      signalingServer = new SignalingServer(
        room?._id,
        user?.uid!,
        (memberId: string) => {
          // console.log(`${memberId} =====YEAH JOINED====`);
          createOffer();
        },
        (offer: any) => {
          // console.log(`${memberId} =====YEAH JOINED====`);
          createAnswer(offer);
        },
        (answer: any) => {
          // console.log(`${memberId} =====YEAH JOINED====`);
          acceptAnswer(answer);
        },
        (iceCandidate: any) => {
          // console.log(`${memberId} =====YEAH JOINED====`);
          if (peerConnection && peerConnection.localDescription) {
            // alert("adding ice");
            peerConnection.addIceCandidate(iceCandidate);
          }
        },
        () => {
          // console.log(`${memberId} =====YEAH JOINED====`);
          // if (peerConnection && peerConnection.localDescription) {
          //   // alert("adding ice");
          //   peerConnection.addIceCandidate(iceCandidate);
          // }
          alert("peer left");
          resetPeerConnection();
          initRoomSession();
        }
      );

      //Add tracks (video, audio) of local stream to peerConnection, so that peer2 will be able to recieve them later via it own .ontrack event
      localStream.getTracks().forEach(async (track) => {
        peerConnection?.addTrack(track, localStream!);
      });

      //Vice versa, when peer2 add it local track to peerConnection, we will recieve its tracks as well, so that we can stream remote media on ourscreen later
      peerConnection.ontrack = (event) => {
        // alert("peerConnection.ontrack");
        event.streams[0].getTracks().forEach(async (track) => {
          remoteStream?.addTrack(track);
        });
      };

      //fire off when ice returns from stun
      peerConnection.onicecandidate = async (event) => {
        console.log("candidatess");
        if (event.candidate) {
          await signalingServer?.channel?.sendMessage({
            text: JSON.stringify({
              type: "candidate",
              candidate: event.candidate,
              id: user?.uid,
            }),
          });
        }
      };

      // console.log("RTM:: signalingServer", signalingServer);

      // setTimeout(() => {
      //   signalingServer.client?.sendMessageToPeer({ text: "heyy" }, "xxx");
      // }, 20000);

      // createOffer();
    } catch (error) {
      console.log("rejected", error);
    }
  };

  const createOffer = async () => {
    // alert("creating offer");

    const offer = await peerConnection?.createOffer();
    // console.log("offer", offer);
    await peerConnection?.setLocalDescription(offer);

    // console.log("peerConnection", peerConnection);

    await signalingServer?.channel?.sendMessage({
      text: JSON.stringify({ type: "offer", offer, id: user?.uid }),
    });
  };

  const createAnswer = async (offer: any) => {
    // alert("creating answer");
    await peerConnection?.setRemoteDescription(offer);
    const answer = await peerConnection?.createAnswer();
    await peerConnection?.setLocalDescription(answer);

    await signalingServer?.channel?.sendMessage({
      text: JSON.stringify({ type: "answer", answer, id: user?.uid }),
    });
  };

  const acceptAnswer = async (answer: any) => {
    // alert("adding answer4444");
    if (!peerConnection?.remoteDescription) {
      peerConnection?.setRemoteDescription(answer);
    }
  };

  useEffect(() => {
    if (user && room) {
      initRoomSession();
    }
    return () => {
      // console.log("RTM: clean signalingServer");
      if (signalingServer) {
        signalingServer.client?.removeAllListeners();
      }
      if (peerConnection) {
        peerConnection.close();
      }
    };
  }, [user, room]);

  //We will workon realtime chat message later
  // useEffect(() => {
  //   let unsubscribe = () => {};
  //   // set up the subscription
  //   if (roomId) {
  //     unsubscribe = subscribeRoomMessages(roomId, (messagse: RoomMessage[]) => {
  //       setRoomMessages(messagse);
  //       console.log("ROOMS MESSAGES RE-READ");
  //     });
  //   }

  //   // return a cleanup function to unsubscribe when the component unmounts
  //   return () => {
  //     // alert("unsub ROOMS MESSAGES");
  //     unsubscribe();
  //   };
  // }, [roomId]);

  return (
    <div className="md:flex h-full">
      {/* Main Content */}
      <div className="w-full md:relative bg-primary h-full relative">
        <div className="flex py-4 justify-between px-4">
          <Button text="Back" emitClick={() => {}} />
          {room?.joiners && room.size && (
            <div className="flex items-center text-white">
              <UsersIcon className="h-5 w-5 mr-2" />
              <div>
                {room?.joiners.length} / {room?.size}
              </div>
            </div>
          )}
        </div>

        <div className="text-white">{user?.uid}</div>

        <SessionControlList onToggleCam={toggleCam} onToggleVoice={toggleMic} />

        <div className="text-white flex">
          <div className="bg-red-400 w-94 h-94">
            <video id="localUser" autoPlay width={400} />
          </div>

          <div className="bg-red-400 w-94 h-94">
            <video id="remoteUser" autoPlay playsInline width={400} />
          </div>
          {/* <video width={600} id="cool2" autoPlay /> */}
        </div>

        {/* <button className="text-white" onClick={}>
          Turn Off
        </button> */}

        {/* <iframe
          width="420"
          height="315"
          src="https://www.youtube.com/embed/tgbNymZ7vqY"
        ></iframe> */}

        <SessionContent />
      </div>

      {/* {controls.chatOn && <SessionChatSidebar />} */}

      {controls.chatOn && <SessionChatOverlayMobile />}
    </div>
  );
};

export default RoomSession;
