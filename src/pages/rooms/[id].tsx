import SessionContainer from "@/components/Session/SessionContainer";
import { fetchSession } from "@/store/sessionSlice";
import { AppDispatch, RootState } from "@/store/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const RoomSession = () => {
  console.log("RoomSession");
  // const { room, controls } = useSelector((state: RootState) => state.session);

  const dispatch: AppDispatch = useDispatch();

  // console.log(controls);

  useEffect(() => {
    dispatch(fetchSession("645a750ecc82afd4b0cfc8a9"));
  }, [dispatch]);

  return <SessionContainer />;
};

export default RoomSession;
