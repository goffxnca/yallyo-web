import { Socket, io } from "socket.io-client";
import { updateRooms } from "../store/roomSlice";
import { ENVS } from "../utils/constants";

export const subscribeRoomsUpdates = (dispatch: any): Socket => {
  const roomsSocket = io(`${ENVS.API_WS_URL}/rooms`);

  roomsSocket.on("open", () => {
    console.log("WebSocket connection opened");
  });

  roomsSocket.on("serverPush", (data) => {
    console.log("serverPush", data);
    dispatch(updateRooms(data));
  });

  roomsSocket.on("closed", () => {
    console.log("WebSocket connection closed");
  });

  return roomsSocket;
};
