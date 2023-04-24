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
  startAt,
  startAfter,
  DocumentData,
  Query,
} from "firebase/firestore";
import { db } from "../../firebase";
import { getRandomItem } from "@/utils/array-utils";
import { ENVS, LANGAUGE_LEVEL, LANGUAGES, TOPICS } from "@/utils/constants";
import { faker } from "@faker-js/faker";

const fetchRooms2 = async (roomId: string): Promise<Room[]> => {
  const response = await fetch(ENVS.API_URL);
  const data = await response.json();
  return data as Room[];
};

const fetchRooms = async (roomId: string): Promise<Room[]> => {
  const roomsCollection = collection(db, "rooms");
  let q: Query<DocumentData>;
  if (roomId) {
    const docRef = doc(db, "rooms", roomId);
    const docSnap = await getDoc(docRef);
    q = query(
      roomsCollection,
      where("active", "==", true),
      orderBy("createdDate", "desc"),
      startAfter(docSnap),
      limit(5)
    );
  } else {
    q = query(
      roomsCollection,
      where("active", "==", true),
      orderBy("createdDate", "desc"),
      limit(5)
    );
  }

  const docsSnap = await getDocs(q);
  const rooms: Room[] = [];
  docsSnap.forEach((doc) => {
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
    limit(5)
  );

  const unsubscribe = onSnapshot(q, (snapshot) => {
    const rooms: Room[] = [];
    snapshot.forEach((doc) => {
      rooms.push(doc.data() as Room);
    });
    console.log("onSnapshot", rooms.length);

    callback(rooms);
  });

  return unsubscribe;
};

const fetchRoomById = async (roomId: string): Promise<Room | null> => {
  const docRef = doc(db, "rooms", roomId);
  const roomSnap = await getDoc(docRef);
  if (roomSnap.exists()) {
    return roomSnap.data() as Room;
  } else {
    return null;
  }
};

const addRooms = async (count: number) => {
  const docRef = doc(db, "rooms", Math.random().toString());
  const newRoom: Room = {
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
    // createdDate: Timestamp.now(),
    createdBy: faker.name.fullName(),
    count: "20",
  };

  const response = await fetch(ENVS.API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newRoom),
  });
  const data = await response.json();
  console.log(data); // Log the response from the server
};

export { fetchRooms, subscribeRooms, addRooms, fetchRoomById, fetchRooms2 };
