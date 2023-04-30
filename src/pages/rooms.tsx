import { AppDispatch } from "@/store/store";
import { subscribeRoomsUpdates } from "@/subscription";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
const HomePage = () => {
  console.log("HomePage");

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    const socket = subscribeRoomsUpdates(dispatch);
    return () => {
      socket.disconnect();
    };
  }, [dispatch]);
  return <div></div>;
};

export default HomePage;
