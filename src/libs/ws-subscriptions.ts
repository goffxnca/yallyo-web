import { Socket, io } from "socket.io-client";
import { updateRooms } from "../store/roomSlice";
import { ENVS } from "../utils/constants";
import {
  ILobbyChat,
  ISocketIOMessage,
  LobbyChatGatewayEventCode,
  RoomsGatewayEventCode,
  SessionsGatewayEventCode,
} from "@/types/common";
import {
  addPeer,
  markPeerAsRemoving,
  addMessage,
  removePeer,
  toggleCam,
  toggleMic,
} from "@/store/sessionSlice";
import { IFirebaseUser, InputDevicesSettings } from "@/types/frontend";
import { addLobbyChatMessage } from "@/store/lobbyChatSlice";

export const subscribeRoomsUpdates = (dispatch: any): Socket => {
  const roomsSocket = io(`${ENVS.API_WS_URL}/rooms`);

  roomsSocket.on("connect", () => {
    console.log("WebSocket /rooms connection is open");
  });

  roomsSocket.on("serverPush", (data) => {
    console.log("serverPush", data);

    const { type, message, payload } = data;
    if (type === RoomsGatewayEventCode.UPDATE) {
      dispatch(updateRooms(payload));
    }
  });

  roomsSocket.on("disconnect", () => {
    console.log("WebSocket  /rooms connection closed");
  });

  return roomsSocket;
};

export const subscribeSessionsUpdates = (
  roomId: string,
  user: IFirebaseUser,
  deviceSettings: InputDevicesSettings,
  dispatch: any,
  callbacks: { onConnected: Function; onJoin: Function; onLeave: Function }
): Socket => {
  const peersSocket = io(
    `${ENVS.API_WS_URL}/sessions?rid=${roomId}&uid=${user.uid}&mon=${
      deviceSettings.micOn ? 1 : 0
    }&con=${deviceSettings.camOn ? 1 : 0}&dname=${user.displayName}`
  );

  peersSocket.on("connect", () => {
    console.log("WebSocket /sessions connection is open");
    callbacks.onConnected();
  });

  peersSocket.on("serverPush", (data: ISocketIOMessage) => {
    console.log("serverPush", data);
    // dispatch(updateRooms(data));

    const { type, message, payload } = data;

    switch (type) {
      case SessionsGatewayEventCode.JOIN:
        //In the case of user refresh the page the leaving,joining of the same person will be very fast, as for when leaving we delay 3 seconds to show lodaing animation
        //It also nice to delay 3 seconds, when joining as well so that, the hard-refresh for rejoining we dont need to write a lot of code to check duplicateion and the adding peer does not need to check everytime
        //And same user will never show like "leaving" and "joining" at the same time
        //The downside is that we will see someone who join the room a bit delay but should be fine.
        //For sure delaying like this might not be the best way to do, but hey it gets the job done :D.
        //Note that joining&leaving add/remove the peer list on server side and notify other peers almost realtime,
        //We just use frontend to delay that process abit before syncing with Redux to make animation join/leave transition looks smooth
        setTimeout(() => {
          dispatch(addPeer(payload));
          callbacks.onJoin(payload);
        }, 3000);
        break;

      case SessionsGatewayEventCode.LEAVE:
        dispatch(markPeerAsRemoving(payload));
        setTimeout(() => {
          dispatch(removePeer(payload));
          callbacks.onLeave(payload);
        }, 3000);

      case SessionsGatewayEventCode.MIC_ON:
        dispatch(toggleMic({ socketId: payload, status: true }));
        break;
      case SessionsGatewayEventCode.MIC_OFF:
        dispatch(toggleMic({ socketId: payload, status: false }));
        break;

      case SessionsGatewayEventCode.CAM_ON:
        dispatch(toggleCam({ socketId: payload, status: true }));
        break;
      case SessionsGatewayEventCode.CAM_OFF:
        dispatch(toggleCam({ socketId: payload, status: false }));
        break;

      case SessionsGatewayEventCode.JOIN_DUPLICATE:
        // console.log("HEY WHAT WRONG HERE");
        window.location.href = "/feedback/session-duplicate";

      case SessionsGatewayEventCode.SEND_MSG:
        dispatch(addMessage(payload));
      default:
        break;
    }
  });

  peersSocket.on("disconnect", () => {
    console.log("WebSocket /sessions connection closed");
  });

  peersSocket.on("error", (data) => {
    console.error("WebSocket /sessions error: ", data);
  });

  return peersSocket;
};

export const subscribeLobbyChatUpdates = (dispatch: any): Socket => {
  const lobbyChatSocket = io(`${ENVS.API_WS_URL}/lobby-chat`);

  lobbyChatSocket.on("connect", () => {
    console.log("WebSocket /lobby-chat connection is open");
  });

  lobbyChatSocket.on("serverPush", (data: ISocketIOMessage) => {
    console.log("serverPush", data);

    const { type, message, payload } = data;
    const lobbyChat = payload as ILobbyChat;
    if (type === LobbyChatGatewayEventCode.SEND) {
      dispatch(addLobbyChatMessage(payload));

      // Notification.requestPermission().then((permission) => {
      //   if (permission === "granted") {
      //     const notificaiton = new Notification(`New Lobby Message`, {
      //       body: `${lobbyChat.sender.dname}: ${lobbyChat.message}`,
      //       icon: lobbyChat.sender.photoURL,
      //       requireInteraction: true,
      //     });
      //   }
      // });

      if (!("Notification" in window)) {
        // Check if the browser supports notifications
        alert("This browser does not support desktop notification");
      } else if (Notification.permission === "granted") {
        // Check whether notification permissions have already been granted;
        // if so, create a notification
        const notificaiton = new Notification(`New Lobby Message2`, {
          body: `${lobbyChat.sender.dname}: ${lobbyChat.message}`,
          // icon: lobbyChat.sender.photoURL,
          // requireInteraction: true,
        });
        // …
      } else if (Notification.permission !== "denied") {
        // We need to ask the user for permission
        Notification.requestPermission().then((permission) => {
          // If the user accepts, let's create a notification
          if (permission === "granted") {
            const notificaiton = new Notification(`New Lobby Message1`, {
              body: `${lobbyChat.sender.dname}: ${lobbyChat.message}`,
              // icon: lobbyChat.sender.photoURL,
              // requireInteraction: true,
            });
          }
        });
      }
    }
  });

  lobbyChatSocket.on("disconnect", () => {
    console.log("WebSocket  /lobby-chat connection closed");
  });

  return lobbyChatSocket;
};
