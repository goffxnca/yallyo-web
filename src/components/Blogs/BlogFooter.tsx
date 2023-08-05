// interface Props {
//   title: string;
//   paragraph1: string;
//   paragraph2?: string;
// }

import Link from "next/link";

const BlogFooter = () => {
  return (
    <footer className="">
      <Link href="/blog" className="underline">
        Back To Blog List
      </Link>
    </footer>
  );
};

export default BlogFooter;
