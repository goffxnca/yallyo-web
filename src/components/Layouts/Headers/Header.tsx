import { signinWithGoogle } from "@/store/authSlice";
import { AppDispatch, RootState } from "@/store/store";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import SigninWithGoogleButton from "./SigninWithGoogleButton";
import AccountMenus from "./AccountMenus";
import { useEffect, useState } from "react";

const Header = () => {
  console.log("Header");
  const dispatch: AppDispatch = useDispatch();
  const authState = useSelector((state: RootState) => state.auth);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="flex items-center justify-between py-1 px-2 md:px-10 bg-secondary fixed top-0 z-40 w-full border-b border-gray-600 bg-opacity-95">
      {/* <div className="text-white text-sm">{status}</div> */}

      {/* <div className="text-white text-sm absolute top-20 left-0 bg-black overflow-hidden">
        {JSON.stringify({ ...authState })}
      </div> */}

      <div className="flex items-center text-accent1 font-bold text-xl">
        <div className="text-accent1 text-3xl">
          <Image src={"/images/yobro2.png"} width={60} height={60} alt="yeh" />
        </div>

        <div>
          <div className="text-2xl">
            Hey<span className="text-accent2">Guyz</span>
            <span className=" text-white text-sm">.com</span>
          </div>
          <div className="text-gray-500 text-sm">
            English Learning Community
            {/* Global Citizen Community */}
          </div>
        </div>
      </div>

      {!loading && (
        <>
          {!authState.user && (
            <SigninWithGoogleButton
              onClick={() => {
                dispatch(signinWithGoogle());
              }}
            />
          )}

          {authState.user?.photoUrl && (
            <AccountMenus
              email={authState.user?.email}
              displayName={authState.user?.displayName}
              profileURL={authState.user?.photoUrl!}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Header;
