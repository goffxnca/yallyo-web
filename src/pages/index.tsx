import Friends from "@/components/Friends/Friends";
import RoomList from "@/components/RoomList";
import { fetchRooms } from "@/services/roomService";
import Image from "next/image";
import { useState } from "react";

const Home = () => {
  const [showFriendPopup, setShowFriendPopup] = useState<boolean>(false);
  const rooms = fetchRooms();

  return (
    <main className="p-10">
      <RoomList rooms={rooms}></RoomList>
      {showFriendPopup && (
        <Friends onEmitClose={() => setShowFriendPopup(false)} />
      )}
      <button onClick={() => setShowFriendPopup(true)}>Show Friend</button>
    </main>
  );
};

export default Home;
