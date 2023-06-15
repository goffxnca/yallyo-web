import { signinWithGoogle } from "@/store/authSlice";
import { AppDispatch, RootState } from "@/store/store";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import SigninWithGoogleButton from "./SigninWithGoogleButton";
import AccountMenus from "./AccountMenus";
import { useEffect, useState } from "react";
import LogoSection from "./LogoSection";

const Header = () => {
  // console.log("Header");
  const dispatch: AppDispatch = useDispatch();
  const authState = useSelector((state: RootState) => state.auth);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="flex items-center justify-between py-1 px-2 md:px-10 bg-secondary fixed top-0 z-30 w-full border-b border-gray-600 bg-opacity-90">
      {/* <div className="text-white text-sm">{status}</div> */}

      {/* <div className="text-white text-sm absolute top-20 left-0 bg-black overflow-hidden">
        {JSON.stringify({ ...authState })}
      </div> */}

      <LogoSection />

      {/* {!loading && (
        <div className="text-center hidden md:block">
          <h1 className="text-gray-100 font-semibold text-lg md:text-2xl">
            Yallyo.com
          </h1>
          <h2 className="text-gray-400 text-xs md:text-sm">
            Language Learning Community
          </h2>
        </div>
      )} */}

      {!loading && (
        <>
          {!authState.user && (
            <SigninWithGoogleButton
              responsive={true}
              onClick={() => {
                dispatch(signinWithGoogle());
              }}
            />
          )}

          {authState.user?.photoURL && (
            <AccountMenus
              email={authState.user?.email}
              displayName={authState.user?.displayName}
              profileURL={authState.user?.photoURL!}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Header;
