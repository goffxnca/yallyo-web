import Link from "next/link";

import {
  ClipboardDocumentListIcon,
  HomeIcon,
} from "@heroicons/react/24/outline";
import BlogNatigator from "./BlogNavigator";

const BlogFooter = () => {
  return (
    <footer className="">
      <BlogNatigator />
      <div className="flex items-center space-x-1 mt-10">
        <Link href="/blog" className="underline">
          Back To Blog List
        </Link>
        <ClipboardDocumentListIcon className="w-6 h-6" />
      </div>
      <div className="flex items-center space-x-1">
        <Link href="/" className="underline">
          Back To Home Page
        </Link>
        <HomeIcon className="w-6 h-6" />
      </div>
    </footer>
  );
};

export default BlogFooter;
