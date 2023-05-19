export type PickOnly<T, K extends keyof T> = Pick<T, K> & {
  [P in Exclude<keyof T, K>]?: never;
};

interface IDbDocument {
  _id: string;
  active: boolean;
  createdAt: string;
  createdBy: string;
  updatedAt: string;
  updatedBy: string;
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
  joiners: Partial<IUser>[];
  size: number;
  order: string;
}

export interface RoomSocketUpdate extends IRoom {
  updateStatus: "C" | "U" | "D";
}
