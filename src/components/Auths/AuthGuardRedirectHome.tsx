import { ReactNode } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import useIsAuthChecked from "@/hooks/useIsAuthChecked";
import { useRouter } from "next/router";

interface Props {
  children: ReactNode;
}

const AuthGuardRedirectHome = ({ children }: Props) => {
  const { user } = useSelector((state: RootState) => state.auth);
  const isAuthChecked = useIsAuthChecked();
  const router = useRouter();

  if (!isAuthChecked) {
    return null;
  }
  if (isAuthChecked && !user) {
    router.push("/");
  }

  return <>{children}</>;
};

export default AuthGuardRedirectHome;
