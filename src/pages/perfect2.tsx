import HeaderContainer from "@/components/@New/HeaderContainer";
import LobbyContainer from "@/components/@New/LobbyContainer";
import MobileNavigator2 from "@/components/@New/MobileNavigators2";
import RoomsContainer from "@/components/@New/RoomsContainer";
import SessionContainer from "@/components/@New/SessionContainer";

const Perfect2Page = () => {
  return (
    <div className="text-white fixed top-0 left-0 w-full">
      <HeaderContainer />
      <div className="flex h-screen">
        <LobbyContainer />
        <RoomsContainer />
        <SessionContainer />
      </div>

      <div className="md:hidden">
        <MobileNavigator2 />
      </div>
    </div>
  );
};

Perfect2Page.noLayout = true;
export default Perfect2Page;
