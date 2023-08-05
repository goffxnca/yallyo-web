import { ReactNode } from "react";

interface Props {
  x: ReactNode;
}

const BlogList = ({ x }: Props) => {
  return (
    <div>
      <ul className="flex gap-2">
        <li className="w-full bg-gray-200 rounded-lg p-2">
          <a
            href="/blog/how-yallyo-connects-strangers-worldwide-for-english-practice"
            className=""
          >
            Break the Ice: How Yallyo Connects Strangers Worldwide for English
            Practice
          </a>
        </li>
        <li className="w-full bg-gray-200 rounded-lg p-2">
          <a
            href="/blog/enhancing-english-fluency-through-yallyo-s-voice"
            className=""
          >
            Finding Your Voice: Enhancing English Fluency Through Yallyo&apos;s
            Voice Chat
          </a>
        </li>
      </ul>
    </div>
  );
};

export default BlogList;
