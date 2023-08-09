import { BLOGS } from "@/utils/constants";
import Link from "next/link";
import { useRouter } from "next/router";

const BlogNatigator = () => {
  const router = useRouter();

  return (
    <div className="">
      <h2 className="text-gray-500 font-bold text-lg">Similiar Blogs</h2>
      <ul>
        {BLOGS.filter((blog) => blog.slug !== router.asPath).map((blog) => (
          <li key={blog.id}>
            <Link href={`${blog.slug}`} className="underline">
              {blog.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlogNatigator;
