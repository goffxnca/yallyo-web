import HeaderContainer from "@/components/@New/HeaderContainer";
import LobbyContainer from "@/components/@New/LobbyContainer";
import RoomsContainer from "@/components/@New/RoomsContainer";
import SessionContainer from "@/components/@New/SessionContainer";

const Perfect2Page = () => {
  return (
    <div className="text-white fixed top-0 left-0 w-full">
      <HeaderContainer />
      <div className="flex h-screen">
        <RoomsContainer />
        <SessionContainer />
        <LobbyContainer />
      </div>
    </div>
  );
};

Perfect2Page.noLayout = true;
export default Perfect2Page;
