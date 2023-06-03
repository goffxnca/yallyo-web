import { Socket, io } from "socket.io-client";
import { updateRooms } from "../store/roomSlice";
import { ENVS } from "../utils/constants";
import {
  ISocketIOMessage,
  IUser,
  RoomsGatewayEventCode,
  SessionsGatewayEventCode,
} from "@/types/common";
import {
  addPeer,
  markPeerAsRemoving,
  removePeer,
  toggleCam,
  toggleMic,
} from "@/store/sessionSlice";
import { IFirebaseUser } from "@/types/frontend";

export const subscribeRoomsUpdates = (dispatch: any): Socket => {
  const roomsSocket = io(`${ENVS.API_WS_URL}/rooms`);

  roomsSocket.on("connect", () => {
    console.log("WebSocket /rooms connection opened");
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
  dispatch: any,
  onJoin: Function
): Socket => {
  const peersSocket = io(
    `${ENVS.API_WS_URL}/sessions?rid=${roomId}&uid=${user.uid}&dname=${user.displayName}`
  );

  peersSocket.on("connect", () => {
    console.log("WebSocket /sessions connection opened");
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
          onJoin(payload);
        }, 3000);
        break;

      case SessionsGatewayEventCode.LEAVE:
        dispatch(markPeerAsRemoving(payload));
        setTimeout(() => {
          dispatch(removePeer(payload));
        }, 3000);

      case SessionsGatewayEventCode.MIC_ON:
      case SessionsGatewayEventCode.MIC_OFF:
        dispatch(toggleMic(payload));
        break;

      case SessionsGatewayEventCode.CAM_ON:
      case SessionsGatewayEventCode.CAM_OFF:
        dispatch(toggleCam(payload));
        break;

      case SessionsGatewayEventCode.JOIN_DUPLICATE:
        // console.log("HEY WHAT WRONG HERE");
        window.location.replace("/feedback/session-timeout");
      default:
        break;
    }
  });

  peersSocket.on("disconnect", () => {
    console.log("WebSocket /sessions connection closed");
  });

  return peersSocket;
};
