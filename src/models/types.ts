import { Timestamp } from "firebase/firestore";

interface DbDocumentBase {
  _id?: string;
  createdAt?: string;
  createdBy?: string;
  updatedAt?: string;
  updatedBy?: string;
  // createdDate: Timestamp;
  // createdDateISO?: string;
}

export interface Room extends DbDocumentBase {
  language: string;
  level: string;
  desc: string;
  topic: string;
  joiners: UserShort[];
  active: boolean;
  count: string;
  size: number;
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

interface UserShort {
  id: string;
  name: string;
  profileUrl: string;
}

export interface RoomMessage extends DbDocumentBase {
  roomId: string;
  message: string;
}
