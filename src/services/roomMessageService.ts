import { Room, RoomMessage } from "@/types/frontend";
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
} from "firebase/firestore";
import { db } from "../../firebase";
import { getRandomItem } from "@/utils/array-utils";
import { JOINERS, LANGAUGE_LEVEL, LANGUAGES, TOPICS } from "@/utils/constants";
import { faker } from "@faker-js/faker";

const getRoomMessages = async (roomId: string): Promise<RoomMessage[]> => {
  const roomMessagesCollection = collection(db, "roomMessages");
  const q = query(roomMessagesCollection, orderBy("createdDate", "desc"));
  const snapshot = await getDocs(q);
  const roomMessages: RoomMessage[] = [];
  snapshot.forEach((doc) => {
    roomMessages.push(doc.data() as RoomMessage);
  });
  return roomMessages;
};

const subscribeRoomMessages = (
  roomId: string,
  callback: Function
): Unsubscribe => {
  const roomsCollection = collection(db, "roomMessages");
  const q = query(
    roomsCollection,
    where("roomId", "==", roomId),
    orderBy("createdDate", "desc")
  );

  const unsubscribe = onSnapshot(q, (snapshot) => {
    console.log("1");
    const roomMessages: RoomMessage[] = [];
    // snapshot.forEach((doc) => {
    //   roomMessages.push(doc.data() as RoomMessage);
    // });
    console.log(roomMessages.length);
    callback(roomMessages);
  });

  return unsubscribe;
};

const createRoomMessage = async (roomId: string, roomMessage?: RoomMessage) => {
  const docRef = doc(db, "roomMessages", Math.random().toString());
  const postData: RoomMessage = {
    _id: docRef.id,
    roomId: roomId,
    message: faker.lorem.sentence(),
    createdBy: faker.name.fullName(),
    active: true,
    // createdDate: Timestamp.now(),
  };

  setDoc(docRef, postData);
};

export { getRoomMessages, createRoomMessage, subscribeRoomMessages };
