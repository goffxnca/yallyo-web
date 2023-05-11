import { signinWithGoogle, signoutFromGoogle } from "@/store/authSlice";
import { AppDispatch, RootState } from "@/store/store";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";

const Header = () => {
  console.log("Header");
  const dispatch: AppDispatch = useDispatch();
  const authState = useSelector((state: RootState) => state.auth);

  return (
    <div className="flex items-center justify-between px-2 md:px-10 bg-secondary shadow-2xl">
      {/* <div className="text-white text-sm">{status}</div> */}
      <div className="text-white text-sm absolute top-20 left-0 bg-black overflow-hidden">
        {JSON.stringify({ ...authState })}
      </div>
      <div className="text-accent1 text-3xl">
        <Image src={"/images/yobro2.png"} width={60} height={60} alt="yeh" />
      </div>
      <div className="text-accent1 font-bold text-xl text-center">
        <div className="text-2xl">
          Hey<span className="text-accent2">Guyz</span>
          <span className=" text-white text-sm">.com</span>
        </div>
        <div className="text-white text-base mt-2">
          Practice English - Meet New Friends
        </div>
      </div>
      {!authState.user && (
        <UserCircleIcon
          onClick={() => {
            dispatch(signinWithGoogle());
          }}
          className="w-10 h-10 text-white"
        />
      )}

      {authState.user?.photoUrl && (
        <Image
          src={authState.user?.photoUrl!}
          className="rounded-full w-10 h-10"
          width={20}
          height={20}
          alt=""
        />
      )}

      {/* {authState.user && ( */}
      <div
        onClick={() => {
          dispatch(signoutFromGoogle());
        }}
      >
        Sign Out
      </div>
      {/* ) */}
    </div>
  );
};

export default Header;
