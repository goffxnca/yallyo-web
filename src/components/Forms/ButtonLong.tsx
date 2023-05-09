import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

interface Props {
  text: string;
  emitClick?: Function;
}

const ButtonLong = ({ text, emitClick }: Props) => {
  return (
    <button
      className="text-white bg-accent1 w-full px-10 py-2 rounded-full"
      onClick={(e) => {
        e.preventDefault();
      }}
    >
      {text}
    </button>
  );
};

export default ButtonLong;
