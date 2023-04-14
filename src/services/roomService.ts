import { Room } from "@/models/types";

const ROOMS: Room[] = [
  {
    id: "xkeif222oektksikefef",
    desc: "Talking about footbal & sport in general",
    language: "Thai",
    level: "Beginner",
    joiners: ["Phattharawit Som", "Bowon Rattana", "Apichet Puta"],
  },
  {
    id: "r2",
    desc: "Music and cool stuff",
    language: "English",
    level: "Intermediate",
    joiners: ["Phattharawit Som", "Bowon Rattana", "Apichet Puta"],
  },
  {
    id: "r3",
    desc: "Movie",
    language: "English",
    level: "Intermediate",
    joiners: ["Phattharawit Som", "Bowon Rattana", "Apichet Puta"],
  },
  {
    id: "r4",
    desc: "cool4",
    language: "English",
    level: "Intermediate",
    joiners: ["Phattharawit Som", "Bowon Rattana", "Apichet Puta"],
  },
  {
    id: "r5",
    desc: "cool5",
    language: "English",
    level: "Advanced",
    joiners: ["Phattharawit Som", "Bowon Rattana", "Apichet Puta"],
  },
  {
    id: "r3e",
    desc: "cool3",
    language: "English",
    level: "Intermediate",
    joiners: ["Phattharawit Som", "Bowon Rattana", "Apichet Puta"],
  },
  {
    id: "r4efe",
    desc: "cool4",
    language: "English",
    level: "Intermediate",
    joiners: ["Phattharawit Som", "Bowon Rattana", "Apichet Puta"],
  },
  {
    id: "r54et",
    desc: "cool5",
    language: "English",
    level: "Advanced",
    joiners: ["Phattharawit Som", "Bowon Rattana", "Apichet Puta"],
  },
  {
    id: "r3et",
    desc: "IEFT and Egnlish grammar",
    language: "English",
    level: "Intermediate",
    joiners: ["Phattharawit Som", "Bowon Rattana", "Apichet Puta"],
  },
  {
    id: "r4et",
    desc: "cool4",
    language: "French",
    level: "Intermediate",
    joiners: ["Phattharawit Som", "Bowon Rattana", "Apichet Puta"],
  },
  {
    id: "r5tyew",
    desc: "cool5",
    language: "English",
    level: "Advanced",
    joiners: ["Phattharawit Som", "Bowon Rattana", "Apichet Puta"],
  },
];

const fetchRooms = () => {
  return ROOMS;
};

const fetchRoomById = (roomId: string) => {
  return ROOMS.find((room) => room.id === roomId);
};

export { fetchRooms, fetchRoomById };
