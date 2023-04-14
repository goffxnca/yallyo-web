import { UserCircleIcon } from "@heroicons/react/24/outline";
import Head from "next/head";
import Image from "next/image";

const Header = () => {
  return (
    <div className="flex items-center justify-between p-2 bg-secondary shadow-2xl">
      <div className="text-accent1 text-3xl">
        <Image src={"/images/yobro2.png"} width={60} height={60} alt="yeh" />
      </div>
      <div className="text-accent1 font-bold text-xl text-center">
        <div>YOBRO.fun</div>
        <div className="text-white">
          Practice English - Meet friends - Enjoy
        </div>
      </div>
      <UserCircleIcon className="w-10 h-10 text-white" />
    </div>
  );
};

export default Header;
