import { Timestamp } from "firebase/firestore";

interface DbDocumentBase {
  _id?: string;
  active: boolean;
  createdAt?: string;
  createdBy?: string;
  updatedAt?: string;
  updatedBy?: string;
}

export interface IUser extends DbDocumentBase {
  displayName: string;
  email: string;
  photoURL: string;
  avatarColor: string;
  bio: string;
  followers: number;
  followings: number;
}

export interface Room extends DbDocumentBase {
  language: string;
  level: string;
  desc: string;
  topic: string;
  joiners: IUser[];
  active: boolean;
  size: number;
  order: string;
}

export interface RoomSocketUpdate extends Room {
  updateStatus: "C" | "U" | "D";
}

export interface RoomsGroupedByLanguage {
  language: string;
  count: number;
}

export interface Pagination {
  pageNumber: number;
  pageSize: number;
}

export interface RoomFilter {
  language?: string;
  level?: string;
  topic?: string;
}

export interface RoomFetchOptions {
  pagination: Pagination;
  filters?: RoomFilter;
  resultStrategy: "append" | "replace";
}

export interface AsyncState {
  status: "idle" | "loading" | "success" | "error";
  error: string;
}

export interface RoomMessage extends DbDocumentBase {
  roomId: string;
  message: string;
}

export interface DropdownItem {
  value: string;
  display: string;
}

export interface SessionConrol {
  micOn: boolean;
  camOn: boolean;
  shareScreenOn: boolean;
  chatOn: boolean;
}

export interface FirebaseUser {
  uid: string;
  displayName: string;
  email: string;
  photoURL: string;
  idToken: string;
}
