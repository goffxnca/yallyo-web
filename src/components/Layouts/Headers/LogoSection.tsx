import Image from "next/image";
import Link from "next/link";

const LogoSection = () => {
  return (
    <Link href="/">
      <div className="flex items-center text-accent1 font-bold text-xl hover:scale-105">
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
    </Link>
  );
};

export default LogoSection;
