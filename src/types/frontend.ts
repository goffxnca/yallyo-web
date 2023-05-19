import { IDbDocument, IPagination, IRoomFilter } from "./common";

export interface RoomsGroupedByLanguage {
  language: string;
  count: number;
}

export interface RoomFetchOptions {
  pagination: IPagination;
  filters?: IRoomFilter;
  resultStrategy: "append" | "replace";
}

export interface IAsyncState {
  status: "idle" | "loading" | "success" | "error";
  error: string;
}

export interface IRoomMessage extends IDbDocument {
  roomId: string;
  message: string;
}

export interface IDropdownItem {
  value: string;
  display: string;
}

export interface SessionConrol {
  micOn: boolean;
  camOn: boolean;
  shareScreenOn: boolean;
  chatOn: boolean;
}

export interface IFirebaseUser {
  uid: string;
  displayName: string;
  email: string;
  photoURL: string;
  idToken: string;
}
