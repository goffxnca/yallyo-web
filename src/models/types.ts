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
  joiners: string[];
  active: boolean;
  count: string;
}

export interface RoomMessage extends MetaDataBase {
  roomId: string;
  message: string;
}
