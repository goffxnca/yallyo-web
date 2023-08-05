import Link from "next/link";
import { ReactNode } from "react";

interface Props {
  x: ReactNode;
}

const BlogList = ({ x }: Props) => {
  return (
    <div>
      <ul className="flex gap-2">
        <li className="w-full bg-gray-200 rounded-lg p-2">
          <Link
            href="/blog/how-yallyo-connects-strangers-worldwide-for-english-practice"
            className=""
          >
            Break the Ice: How Yallyo Connects Strangers Worldwide for English
            Practice
          </Link>
        </li>
        <li className="w-full bg-gray-200 rounded-lg p-2">
          <Link
            href="/blog/enhancing-english-fluency-through-yallyo-s-voice"
            className=""
          >
            Finding Your Voice: Enhancing English Fluency Through Yallyo&apos;s
            Voice Chat
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default BlogList;
