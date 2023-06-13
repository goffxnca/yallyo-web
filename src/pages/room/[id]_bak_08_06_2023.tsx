import SessionContainer from "@/components/Session_BAK_08_06_2023/SessionContainer_bak";
import { fetchSessionAsync } from "@/store/sessionSlice";
import { AppDispatch, RootState } from "@/store/store";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const RoomSession_Bakup_08_06_2023 = () => {
  console.log("RoomSession_Bakup_08_06_2023");
  const { user } = useSelector((state: RootState) => state.auth);

  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id && user) {
      dispatch(fetchSessionAsync(id.toString()));
    }
  }, [dispatch, id, user]);

  return <SessionContainer />;
};

export default RoomSession_Bakup_08_06_2023;
