import SessionContainer from "@/components/Session/SessionContainer";
import { fetchSession } from "@/store/sessionSlice";
import { AppDispatch, RootState } from "@/store/store";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const RoomSession = () => {
  console.log("RoomSession");
  const { user } = useSelector((state: RootState) => state.auth);

  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id && user) {
      dispatch(fetchSession(id.toString()));
    }
  }, [dispatch, id, user]);

  return <SessionContainer />;
};

export default RoomSession;
