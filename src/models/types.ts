import { Timestamp } from "firebase/firestore";

interface FirebaseDocBase {
  id: string;
  createdBy: string;
  createdDate: Timestamp;
  createdDateISO?: string;
}

export interface Room extends FirebaseDocBase {
  language: string;
  level: string;
  desc: string;
  topic: string;
  joiners: string[];
  active: boolean;
}

export interface RoomMessage extends FirebaseDocBase {
  roomId: string;
  message: string;
}
