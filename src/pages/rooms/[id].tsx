import SessionContainer from "@/components/Session/SessionContainer";
import { fetchSession } from "@/store/sessionSlice";
import { AppDispatch, RootState } from "@/store/store";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const RoomSession = () => {
  console.log("RoomSession");
  // const { room, controls } = useSelector((state: RootState) => state.session);

  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      dispatch(fetchSession(id.toString()));
    }
  }, [dispatch, id]);

  return <SessionContainer />;
};

export default RoomSession;
