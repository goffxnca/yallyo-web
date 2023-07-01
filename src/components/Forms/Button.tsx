import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

interface Props {
  text: string;
  emitClick: Function;
}

const Button = ({ text, emitClick }: Props) => {
  return (
    <Link href={"/"} className="text-white">
      <div className=" items-center bg-secondary inline-flex px-4 py-2 rounded-full">
        <ChevronLeftIcon className="w-4 h-4 text-white" />
        <span className="text-sm">{text}</span>
      </div>
    </Link>
  );
};

export default Button;
