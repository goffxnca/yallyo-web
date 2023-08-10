import { signoutFromGoogle } from "@/store/authSlice";
import { AppDispatch } from "@/store/store";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const LogoutPage = () => {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(signoutFromGoogle());
  }, []);

  return <div>Logout</div>;
};

export default LogoutPage;
