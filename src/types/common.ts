//This common.ts file contains shared types between frontend and backend repositories and they should always in-synced
// export type PickOnly<T, K extends keyof T> = Pick<T, K> & {
//   [P in Exclude<keyof T, K>]?: never;
// };

export interface IDbDocument {
  _id: string | any;
  active: boolean;
  createdAt: string;
  createdBy: string;
  updatedAt?: string;
  updatedBy?: string;
}

export interface IUser extends IDbDocument {
  dname: string;
  email: string;
  photoURL: string;
  color: string;
  bio: string;
  followers: number;
  followings: number;
  provider: string;
  //This flag is not meant to be use as schema, just utility flag
  isFollowing?: boolean;
}

export interface IFollow {
  _id: string | any;
  followerId: string;
  followeeId: string;
  createdAt: string;
}

export type TMinimalUser = Pick<IUser, "_id" | "dname" | "photoURL" | "color">;

export interface IRoom extends IDbDocument {
  //sid is for short friendly id
  sid: string;
  language: string;
  level: string;
  topic: string;
  desc: string;
  joiners: TMinimalUser[];
  size: number;
  order: string;
}

export interface IRoomSocketUpdate extends IRoom {
  updateStatus: "C" | "U" | "D";
}

export interface IPagination {
  pnum: number;
  psize: number;
}

export interface IRoomFilter {
  language?: string;
  level?: string;
  topic?: string;
}

//Room Sessions
export interface ISocketIOMessage {
  type: RoomsGatewayEventCode | SessionsGatewayEventCode;
  message?: string;
  payload?: any;
}

export interface IRoomPeer {
  socketId: string;
  roomId: string;
  userId: string;
  joinedAt: string;
  controls: IMediaControls;
  userInfo: TMinimalUser;
  status: "joining" | "leaving" | "connected";
}

export interface IMediaControls {
  micOn: boolean;
  camOn: boolean;
  screenOn: boolean;
  speaking: boolean;
}

export interface IRoomPeerSocketUpdates extends IRoomPeer {
  updateStatus: "C" | "U" | "D";
}

export type SessionEventType = "chat" | "event";

export interface ISessionEventMessage {
  id: string;
  type: SessionEventType;
  subType: string;
  message: string;
  sender: TMinimalUser;
  isMe: boolean;
  sentAt: string;
  read: boolean;
}

export enum RoomsGatewayEventCode {
  UPDATE = "update",
}

export enum SessionsGatewayEventCode {
  JOIN = "join",
  JOIN_DUPLICATE = "join_duplicate",
  LEAVE = "leave",
  MIC_ON = "mic_on",
  MIC_OFF = "mic_off",
  CAM_ON = "cam_on",
  CAM_OFF = "cam_off",
  SEND_MSG = "send_msg",
  SPEAK_ON = "speak_on",
  SPEAK_OFF = "speak_off",
}
