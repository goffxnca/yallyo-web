import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const useIsAuthChecked = () => {
  const { userStateVerified } = useSelector((state: RootState) => state.auth);
  // return status === "success" || status === "error";
  return userStateVerified;
};

export default useIsAuthChecked;
