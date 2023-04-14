import { Room } from "@/models/types";

const ROOMS: Room[] = [
  {
    id: "xkeif222oektksikefef",
    desc: "cool1",
    language: "Thai",
    level: "Beginner",
    joiners: ["Phattharawit Som", "Bowon Rattana", "Apichet Puta"],
  },
  {
    id: "r2",
    desc: "cool2",
    language: "English",
    level: "Intermediate",
    joiners: ["Phattharawit Som", "Bowon Rattana", "Apichet Puta"],
  },
  {
    id: "r3",
    desc: "cool3",
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
    id: "r3",
    desc: "cool3",
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
    id: "r3",
    desc: "cool3",
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
];

const fetchRooms = () => {
  return ROOMS;
};

const fetchRoomById = (roomId: string) => {
  return ROOMS.find((room) => room.id === roomId);
};

export { fetchRooms, fetchRoomById };
