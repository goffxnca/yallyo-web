import { useDispatch, useSelector } from "react-redux";

import { AppDispatch } from "@/store/store";
import { generateTempUserAsync, signinWithGoogle } from "@/store/authSlice";
import Modal from "../UIs/Modal";
import SigninWithGoogleButton from "../Layouts/Headers/SigninWithGoogleButton";
import { RootState } from "@/store/store";
import DarkOverlay from "../Layouts/Overlay";
import { showAlert } from "@/store/alertSlice";
import Loading from "../UIs/Loading";

interface Props {
  onCloseModal: Function;
  onLoginSucceed: Function;
}

const LoginModal = ({ onCloseModal, onLoginSucceed }: Props) => {
  const dispatch: AppDispatch = useDispatch();
  const { status, isGeneratingTempUser } = useSelector(
    (state: RootState) => state.auth
  );
  const loading = isGeneratingTempUser;

  const generateTempUserHandler = () => {
    dispatch(generateTempUserAsync()).then((generatedUser) => {
      onLoginSucceed();
      dispatch(
        showAlert({
          mode: "success",
          title: "New temporarily user created successfully!",
          message: `Now, you can use Yallyo with user name: ${generatedUser.payload}`,
          buttonText: "",
          buttonLink: "",
        })
      );
    });
  };

  return (
    <Modal emitClose={onCloseModal}>
      <div className="flex justify-center items-center p-2 py-6 md:p-10 max-w-[500px]">
        <div className="space-y-6">
          <div className=" text-white text-center text-lg font-bold">
            To get started on Yallyo you have 2 options:
          </div>

          <div className="border border-gray-700 p-4 space-y-4 rounded-md group hover:shadow-2xl cursor-default">
            <div className=" text-gray-200 text-center">
              <span className="text-accent2 font-semibold">Option 1: </span>
              <span className="font-semibold group-hover:font-bold">
                Connect with your Google Account
              </span>
            </div>

            <p className="text-gray-400 text-xs text-center group-hover:text-white">
              Unlock Yallyo&apos;s full potential! Seamlessly access all
              features with Google, no subscription required.
            </p>

            <div className="flex justify-center">
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

          <div className="text-white text-center">OR</div>

          <div className="border border-gray-700 p-4 space-y-4 rounded-md group hover:shadow-2xl cursor-default">
            <div className=" text-gray-200 text-center">
              <span className="text-accent1 font-semibold">Option 2: </span>
              <span className="font-semibold group-hover:font-bold">
                Generate a Temporary Account
              </span>
            </div>

            <p className="text-gray-400 text-xs text-center group-hover:text-white">
              Hesitant to log in? Explore Yallyo seamlessly without logging in!
              Let&apos;s Yallyo generate new temporary account for you, Expires
              in 3 months, convertible to a permanent account anytime for free.
            </p>

            <div className="flex justify-center">
              <button
                className={`flex w-[180px] animate-bounce justify-center rounded-md px-3 py-3 text-sm font-semibold shadow-sm select-none ${
                  loading
                    ? "bg-accent2 text-secondary pointer-events-none"
                    : "bg-accent1 text-white"
                }`}
                disabled={loading}
                onClick={generateTempUserHandler}
              >
                {loading && <Loading />}

                <span className="">
                  {loading ? "Generating" : "Generate Account"}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {(status === "loading" || isGeneratingTempUser) && (
        <DarkOverlay text="" />
      )}
    </Modal>
  );
};

export default LoginModal;
