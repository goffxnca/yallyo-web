import { useDispatch } from "react-redux";
import Button from "../../Forms/Button";
import SigninWithGoogleButton from "../../Layouts/Headers/SigninWithGoogleButton";
import { AppDispatch } from "@/store/store";
import { signinWithGoogle } from "@/store/authSlice";
import { useRouter } from "next/router";

const AuthRequired = () => {
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();

  const handleGoHomeClick = () => {
    router.replace("/");
  };

  return (
    <div className="flex justify-center items-center h-screen p-10">
      <div className="">
        <div className=" text-white text-center">
          🔒 You need to login with Google Account to join the room.
        </div>

        <div className="flex justify-center mt-4">
          <SigninWithGoogleButton
            responsive={false}
            onClick={() => {
              dispatch(signinWithGoogle());
            }}
          />
        </div>

        <div className="flex justify-center mt-4">
          <Button text="Go Back Home Page" emitClick={handleGoHomeClick} />
        </div>
      </div>
    </div>
  );
};

export default AuthRequired;
