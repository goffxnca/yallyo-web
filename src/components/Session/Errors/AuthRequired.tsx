import { useDispatch } from "react-redux";
import Button from "../../Forms/Button";
import SigninWithGoogleButton from "../../Layouts/Headers/SigninWithGoogleButton";
import { AppDispatch } from "@/store/store";
import { signinWithGoogle } from "@/store/authSlice";
import { useRouter } from "next/router";

interface Props {
  message?: string;
}

const AuthRequired = ({ message }: Props) => {
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();

  const handleGoHomeClick = () => {
    router.replace("/");
  };

  return (
    <div className="flex justify-center items-center h-screen p-10">
      <div className="">
        <div className=" text-white text-center">
          {message ||
            "🔒 You need to login with Google Account to see content of this page."}
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
