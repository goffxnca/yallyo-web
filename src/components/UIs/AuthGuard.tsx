import { ReactNode, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useEffect } from "react";
import useIsAuthChecked from "@/hooks/useIsAuthChecked";
import AuthRequired from "../Session/Errors/AuthRequired";

interface Props {
  redirectToHome: boolean;
  children: ReactNode;
}

const AuthGuard = ({ redirectToHome, children }: Props) => {
  const { user } = useSelector((state: RootState) => state.auth);
  const isAuthChecked = useIsAuthChecked();
  const [showProtectedContent, setShowProtectedContent] = useState(false);

  useEffect(() => {
    if (isAuthChecked) {
      if (user) {
        setShowProtectedContent(true);
      } else {
        if (redirectToHome) {
          window.location.href = "/";
        }
      }
    }
  }, [isAuthChecked, user, redirectToHome]);

  if (!isAuthChecked) {
    return null;
  }
  if (!showProtectedContent) {
    return <AuthRequired />;
  }

  return <>{children}</>;
};

export default AuthGuard;
