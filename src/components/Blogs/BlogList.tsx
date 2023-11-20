import { BLOGS } from "@/utils/constants";
import Link from "next/link";
import Avatar from "../UIs/Avatar";
import Separator from "../Layouts/Headers/Separator";

const BlogList = () => {
  return (
    <div className="text-black">
      <div className="text-center">
        <h1 className="text-black text-4xl font-bold">
          Yallyo&apos;s Articles and News
        </h1>
        <p className="mt-2 font-semibold text-gray-500">
          Explore Language Learning and Cultural Insights: Yallyo&apos;s
          Engaging Articles and News Collection.
        </p>
      </div>

      <Separator />

      <ul className="grid md:grid-cols-2 gap-4">
        {BLOGS.map((blog) => (
          <li className=" rounded-lg shadow-lg hover:shadow-2xl" key={blog.id}>
            <article>
              <Link href={blog.slug} className="">
                <div className="space-y-2">
                  <img
                    src={blog.thumbnail}
                    alt={blog.title}
                    className="rounded-t-lg h-[200px] w-full object-cover content-center"
                  />
                  <div className="p-4 space-y-4">
                    <header>
                      <h2 className="text-xl font-semibold">{blog.title}</h2>
                    </header>
                    <section>
                      <p className="text-gray-500">{blog.intro}</p>
                    </section>
                    <footer className="flex justify-between items-center text-gray-300 text-sm">
                      <div className="flex items-center">
                        <Avatar
                          userId={"admin"}
                          name="Goff"
                          size="xs"
                          url="https://firebasestorage.googleapis.com/v0/b/yallyo.appspot.com/o/us%2Fc9329070-3ea4-4533-be3e-dfa606000829.jpeg?alt=media"
                          color=""
                          hilight={false}
                          clickable={false}
                        />

                        <div className="ml-4">{blog.author.displayName}</div>
                      </div>

                      <div>{blog.publishedAt}</div>
                    </footer>
                  </div>
                </div>
              </Link>
            </article>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlogList;
