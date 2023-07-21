import Image from "next/image";
import Link from "next/link";

const LogoSection = () => {
  return (
    <Link href="/">
      <div className="text-accent1 font-bold text-xl hover:scale-105">
        {/* <div className="text-accent1 text-3xl">
          <img src={"/images/yallyo9.png"} alt="Yallyo Logo" className="w-28" />
        </div> */}

        {/* <div className="text-gray-100  text-[10px] -rotate-6 -mt-3">
          Language Community
        </div> */}
      </div>
    </Link>
  );
};

export default LogoSection;
