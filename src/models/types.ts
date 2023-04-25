import { Timestamp } from "firebase/firestore";

interface MetaDataBase {
  _id?: string;
  createdBy: string;
  // createdDate: Timestamp;
  // createdDateISO?: string;
}

export interface Room extends MetaDataBase {
  language: string;
  level: string;
  desc: string;
  topic: string;
  joiners: UserShort[];
  active: boolean;
  count: string;
  size: number;
}

interface UserShort {
  id: string;
  name: string;
  profileUrl: string;
}

export interface RoomMessage extends MetaDataBase {
  roomId: string;
  message: string;
}
