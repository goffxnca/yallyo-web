import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

interface Props {
  text: string;
  emitClick: Function;
}

const Button = ({ text, emitClick }: Props) => {
  return (
    // <button className="bg-tertiary py-2 px-5 rounded-full font-semibold transition-all duration-300  hover:bg-free800 focus:outline-none">
    //   <ChevronLeftIcon className="w-6 h-6 text-white" />
    //   <Link href={"/"}>
    //     <a>Back</a>
    //   </Link>
    // </button>

    <Link href={"/"} className="text-white">
      <div className=" items-center bg-secondary inline-flex px-3 py-1 rounded-full">
        <ChevronLeftIcon className="w-4 h-4 text-white" />
        <span className="text-sm">Back</span>
      </div>
    </Link>
  );
};

export default Button;
