import { useRouter } from "next/router";
import LoginModal from "@/components/Modals/LoginModal";

const AuthGuardShowLoginModal = () => {
  const router = useRouter();

  return (
    <LoginModal
      onCloseModal={() => {
        router.push("/");
      }}
      onLoginSucceed={() => {
        //No ned to do anything, the caller will detect login succes using global user state
      }}
    />
  );
};

export default AuthGuardShowLoginModal;
