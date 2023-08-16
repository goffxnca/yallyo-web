import ProfileForm from "@/components/Profile/ProfileForm";
import { fetchProfileAsync } from "@/store/profileSlice";
import { AppDispatch, RootState } from "@/store/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const WalletContainer = () => {
  console.log("WalletContainer");
  const { profile } = useSelector((state: RootState) => state.profile);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if (dispatch) {
      dispatch(fetchProfileAsync());
    }
  }, [dispatch]);

  if (!profile) {
    return null;
  }

  return <div className="text-white">This is Wallet Container</div>;
};

export default WalletContainer;
