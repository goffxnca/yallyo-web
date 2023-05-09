import { UserCircleIcon } from "@heroicons/react/24/outline";
import Head from "next/head";
import Image from "next/image";
import { auth, provider } from "../../../firebase";
import { signInWithPopup } from "firebase/auth";

const Header = () => {
  const handleGoogleSignin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      console.log(result);
    } catch (error) {}
  };

  return (
    <div className="flex items-center justify-between p-2 bg-secondary shadow-2xl">
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
      <UserCircleIcon
        onClick={handleGoogleSignin}
        className="w-10 h-10 text-white"
      />
    </div>
  );
};

export default Header;
