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

//Local control means, the controls that when value changed no need to sync with other peers
export interface LocalControls {
  chatOn: boolean;
}
export interface InputDevicesSettings {
  micOn: boolean;
  micId: string;
  camOn: boolean;
  camId: string;
}

export interface IFirebaseUser {
  uid: string;
  displayName: string;
  email: string;
  photoURL: string;
  idToken: string;
}

export interface IBlog {
  id: string;
  title: string;
  intro: string;
  thumbnail: string;
  slug: string;
  author: IFirebaseUser;
  publishedAt: string;
}
