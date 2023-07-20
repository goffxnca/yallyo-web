import { useDispatch, useSelector } from "react-redux";

import { AppDispatch } from "@/store/store";
import { signinWithGoogle } from "@/store/authSlice";
import Modal from "../UIs/Modal";
import SigninWithGoogleButton from "../Layouts/Headers/SigninWithGoogleButton";
import { RootState } from "@/store/store";
import DarkOverlay from "../Layouts/Overlay";

interface Props {
  message?: string;
  onCloseModal: Function;
  onLoginSucceed: Function;
}

const LoginModal = ({ message, onCloseModal, onLoginSucceed }: Props) => {
  const dispatch: AppDispatch = useDispatch();
  const { status } = useSelector((state: RootState) => state.auth);

  return (
    <Modal emitClose={onCloseModal}>
      <div className="flex justify-center items-center p-10 max-w-[400px]">
        <div className="">
          <div className=" text-white text-center">
            {message ||
              "🔒 You need to login with Google Account to see content of this page."}
          </div>

          <div className="flex justify-center mt-10">
            <SigninWithGoogleButton
              responsive={false}
              onClick={() => {
                dispatch(signinWithGoogle()).then(() => {
                  onLoginSucceed();
                });
              }}
            />
          </div>
        </div>
      </div>

      {status === "loading" && <DarkOverlay text="Signing In..." />}
    </Modal>
  );
};

export default LoginModal;
