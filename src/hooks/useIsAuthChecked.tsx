import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const useIsAuthChecked = () => {
  const { status } = useSelector((state: RootState) => state.auth);
  return status === "success" || status === "error";
};

export default useIsAuthChecked;
