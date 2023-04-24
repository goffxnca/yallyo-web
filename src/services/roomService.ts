import { Room } from "@/models/types";
import {
  Unsubscribe,
  onSnapshot,
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  setDoc,
  Timestamp,
  where,
  limit,
} from "firebase/firestore";
import { db } from "../../firebase";
import { getRandomItem } from "@/utils/array-utils";
import { JOINERS, LANGAUGE_LEVEL, LANGUAGES, TOPICS } from "@/utils/constants";
import { faker } from "@faker-js/faker";
import firebase from "firebase/app";

const fetchRooms = async (): Promise<Room[]> => {
  const roomsCollection = collection(db, "rooms");
  const q = query(roomsCollection, orderBy("createdDate", "desc"));
  const snapshot = await getDocs(q);
  const rooms: Room[] = [];
  snapshot.forEach((doc) => {
    rooms.push(doc.data() as Room);
  });
  return rooms;
};

const subscribeRooms = (callback: Function): Unsubscribe => {
  const roomsCollection = collection(db, "rooms");
  const q = query(
    roomsCollection,
    where("active", "==", true),
    orderBy("createdDate", "desc"),
    limit(10)
  );

  const unsubscribe = onSnapshot(q, (snapshot) => {
    console.log("1");
    const rooms: Room[] = [];
    snapshot.forEach((doc) => {
      rooms.push(doc.data() as Room);
    });
    console.log(rooms.length);
    callback(rooms);
  });

  return unsubscribe;
};

const fetchRoomById = async (roomId: string): Promise<Room | null> => {
  const roomDoc = doc(db, "rooms", roomId);
  const roomSnap = await getDoc(roomDoc);
  if (roomSnap.exists()) {
    return roomSnap.data() as Room;
  } else {
    return null;
  }
};

const addRooms = async (room?: Room) => {
  const postRef = doc(db, "rooms", Math.random().toString());
  const postData: Room = {
    id: postRef.id,
    level: getRandomItem(LANGAUGE_LEVEL),
    language: getRandomItem(LANGUAGES),
    joiners: [
      faker.name.fullName(),
      faker.name.fullName(),
      faker.name.fullName(),
    ],
    topic: getRandomItem(TOPICS),
    desc: faker.lorem.sentence(),
    active: true,
    createdDate: Timestamp.now(),
    createdBy: faker.name.fullName(),
  };

  setDoc(postRef, postData);
};

export { fetchRooms, subscribeRooms, addRooms, fetchRoomById };
