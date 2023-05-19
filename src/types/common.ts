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
}

export interface IRoom extends IDbDocument {
  language: string;
  level: string;
  topic: string;
  desc: string;
  joiners: Pick<IUser, "_id" | "dname" | "photoURL" | "color">[];
  size: number;
  order: string;
}

export interface IRoomSocketUpdate extends IRoom {
  updateStatus: "C" | "U" | "D";
}

export interface IPagination {
  pageNumber: number;
  pageSize: number;
}

export interface IRoomFilter {
  language?: string;
  level?: string;
  topic?: string;
}
