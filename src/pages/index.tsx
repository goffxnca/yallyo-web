import RoomList from "@/components/RoomList";
import { Room } from "@/models/types";
import Image from "next/image";

const Home = () => {
  const ROOMS: Room[] = [
    {
      id: "r1",
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
  ];

  return (
    <main>
      <RoomList rooms={ROOMS}></RoomList>
    </main>
  );
};

export default Home;
