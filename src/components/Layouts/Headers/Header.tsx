import { useState } from "react";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import AccountMenus from "./AccountMenus";
import LogoSection from "./LogoSection";
import useIsAuthChecked from "@/hooks/useIsAuthChecked";
import LoginModal from "@/components/Modals/LoginModal";
import Link from "next/link";
import Image from "next/image";

const Header = () => {
  // console.log("Header");

  const authState = useSelector((state: RootState) => state.auth);
  const isAuthChecked = useIsAuthChecked();
  const [showLoginModal, setShowLoginModal] = useState(false);

  return (
    <div className="flex items-center justify-between py-1 px-2 md:px-10 bg-secondary fixed top-0 w-full border-b border-gray-600 bg-opacity-90 z-30">
      {/* <div className="text-white text-sm">{status}</div> */}

      {/* <div className="text-white text-sm absolute top-20 left-0 bg-black overflow-hidden">
        {JSON.stringify({ ...authState })}
      </div> */}

      <LogoSection />

      {isAuthChecked && (
        <div className="absolute left-[50%] transform translate-x-[-50%] text-center hidden md:block">
          <div className="text-gray-100 font-semibold text-lg md:text-2xl">
            Yallyo.com
          </div>
          <div className="text-gray-400 text-xs md:text-sm">
            Practice English Speaking with Strangers Worldwide!
          </div>
        </div>
      )}

      {isAuthChecked && (
        <div className="flex items-center">
          {!authState.user && (
            <button
              className="text-white border border-gray-200 rounded-md px-4 py-2 hover:bg-accent1 hover:border-none"
              onClick={() => {
                setShowLoginModal(true);
              }}
            >
              Sign In
            </button>
          )}

          {authState.user?.photoURL && (
            <AccountMenus
              email={authState.user?.email}
              displayName={authState.user?.displayName}
              profileURL={authState.user?.photoURL!}
              type1={authState.user?.type1}
            />
          )}

          <div className="block group">
            <Link
              href="https://github.com/goffxnca"
              className="group-hover:underline flex items-center"
              target="_blank"
            >
              <Image
                src="/icons/github.svg"
                alt="Goff Phattharawit Github account"
                className="group-hover:scale-110"
                width={24}
                height={24}
              />
            </Link>
          </div>
        </div>
      )}

      {showLoginModal && (
        <LoginModal
          onCloseModal={() => {
            setShowLoginModal(false);
          }}
          onLoginSucceed={() => {
            setShowLoginModal(false);
          }}
        />
      )}
    </div>
  );
};

export default Header;
