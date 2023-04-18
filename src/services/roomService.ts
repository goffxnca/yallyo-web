// import { Room } from "@/models/types";

import { Room } from "@/models/types";
// import {
//   Firestore,
//   collection,
//   doc,
//   getDoc,
//   getDocs,
//   orderBy,
//   query,
//   setDoc,
// } from "firebase/firestore/lite";
import {
  Unsubscribe,
  onSnapshot,
  Firestore,
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  setDoc,
} from "firebase/firestore";
import db from "../../firebase";
import { getRandomItem } from "@/utils/array-utils";
import { JOINERS, LANGAUGE_LEVEL, LANGUAGES, TOPICS } from "@/utils/constants";
import { faker } from "@faker-js/faker";

// const ROOMS: Room[] = [
//   {
//     id: "xkeif222oektksikefef",
//     desc: "Talking about footbal & sport in general",
//     language: "Thai",
//     level: "Beginner",
//     joiners: ["Phattharawit Som", "Bowon Rattana", "Apichet Puta"],
//   },
//   {
//     id: "r2",
//     desc: "Music and cool stuff",
//     language: "English",
//     level: "Intermediate",
//     joiners: ["Phattharawit Som", "Bowon Rattana", "Apichet Puta"],
//   },
//   {
//     id: "r3",
//     desc: "Movie",
//     language: "English",
//     level: "Intermediate",
//     joiners: ["Phattharawit Som", "Bowon Rattana", "Apichet Puta"],
//   },
//   {
//     id: "r4",
//     desc: "cool4",
//     language: "English",
//     level: "Intermediate",
//     joiners: ["Phattharawit Som", "Bowon Rattana", "Apichet Puta"],
//   },
//   {
//     id: "r5",
//     desc: "cool5",
//     language: "English",
//     level: "Advanced",
//     joiners: ["Phattharawit Som", "Bowon Rattana", "Apichet Puta"],
//   },
//   {
//     id: "r3e",
//     desc: "cool3",
//     language: "English",
//     level: "Intermediate",
//     joiners: ["Phattharawit Som", "Bowon Rattana", "Apichet Puta"],
//   },
//   {
//     id: "r4efe",
//     desc: "cool4",
//     language: "English",
//     level: "Intermediate",
//     joiners: ["Phattharawit Som", "Bowon Rattana", "Apichet Puta"],
//   },
//   {
//     id: "r54et",
//     desc: "cool5",
//     language: "English",
//     level: "Advanced",
//     joiners: ["Phattharawit Som", "Bowon Rattana", "Apichet Puta"],
//   },
//   {
//     id: "r3et",
//     desc: "IEFT and Egnlish grammar",
//     language: "English",
//     level: "Intermediate",
//     joiners: ["Phattharawit Som", "Bowon Rattana", "Apichet Puta"],
//   },
//   {
//     id: "r4et",
//     desc: "cool4",
//     language: "French",
//     level: "Intermediate",
//     joiners: ["Phattharawit Som", "Bowon Rattana", "Apichet Puta"],
//   },
//   {
//     id: "r5tyew",
//     desc: "cool5",
//     language: "English",
//     level: "Advanced",
//     joiners: ["Phattharawit Som", "Bowon Rattana", "Apichet Puta"],
//   },
// ];

// const fetchRooms = () => {
//   return ROOMS;
// };

// const fetchRoomById = (roomId: string) => {
//   return ROOMS.find((room) => room.id === roomId);
// };

// const addRoom = (room: Room) => {
//   return ROOMS.push(room);
// };

// export { fetchRooms, fetchRoomById, addRoom };

const fetchRooms = async (): Promise<Room[]> => {
  const roomsCollection = collection(db, "rooms");
  const q = query(roomsCollection, orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);
  const rooms: Room[] = [];
  snapshot.forEach((doc) => {
    rooms.push(doc.data() as Room);
  });
  return rooms;
};

const subscribeRoomsChanges = (callback: Function): Unsubscribe => {
  const roomsCollection = collection(db, "rooms");
  // const q = query(roomsCollection, orderBy("createdAt", "desc"));

  const unsubscribe = onSnapshot(roomsCollection, (snapshot) => {
    console.log("1");
    const rooms: Room[] = [];
    snapshot.forEach((doc) => {
      rooms.push(doc.data() as Room);
    });
    callback(rooms);
  });

  return unsubscribe;

  // return new Promise<Room[]>((resolve, reject): Unsubscribe => {
  //   const unsubscribe = onSnapshot(
  //     q,
  //     (snapshot) => {
  //       const rooms: Room[] = [];
  //       snapshot.forEach((doc) => {
  //         rooms.push(doc.data() as Room);
  //       });
  //       resolve(rooms);
  //     },
  //     (error) => {
  //       reject(error);
  //     }
  //   );

  //   // return a function that can be called to unsubscribe from the listener
  //   return unsubscribe;
  // });
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
      getRandomItem(JOINERS),
      getRandomItem(JOINERS),
      getRandomItem(JOINERS),
    ],
    topic: getRandomItem(TOPICS),
    desc: faker.lorem.sentence(),
    active: true,
    createdAt: Date.now().toString(),
  };

  setDoc(postRef, postData);
};

export { fetchRooms, subscribeRoomsChanges, addRooms, fetchRoomById };
