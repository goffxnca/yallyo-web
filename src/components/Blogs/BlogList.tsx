import { BLOGS } from "@/utils/constants";
import Link from "next/link";
import { ReactNode } from "react";

interface Props {
  x: ReactNode;
}

const BlogList = ({ x }: Props) => {
  return (
    <div className="text-black">
      <header>
        <h1 className="text-black text-4xl text-center pb-10 font-bold">
          Yallyo&apos;s Articles and News
        </h1>
      </header>
      <ul className="grid md:grid-cols-2 gap-4">
        {BLOGS.map((blog) => (
          <li className=" rounded-lg shadow-lg hover:shadow-2xl" key={blog.id}>
            <Link href={blog.slug} className="">
              <div className="space-y-2">
                <img
                  src={blog.thumbnail}
                  alt={blog.title}
                  className="rounded-t-lg h-[200px] w-full object-cover content-center"
                />
                <div className="p-4 space-y-4">
                  <h2 className="text-xl font-semibold">{blog.title}</h2>
                  <p className="text-gray-500">{blog.intro}</p>

                  <footer>
                    <div className="flex justify-between text-gray-300 text-sm">
                      <div>Goff Phattharawit</div>
                      <div className="">12, August, 2023</div>
                    </div>
                  </footer>
                </div>
              </div>
            </Link>
          </li>
        ))}
        {/* <li className="w-full bg-gray-200 rounded-lg p-2">
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
        </li> */}
      </ul>
    </div>
  );
};

export default BlogList;
