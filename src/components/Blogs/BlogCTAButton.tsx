import Link from "next/link";

const BlogCTAButton = () => {
  return (
    <button className="flex justify-center my-4 w-full">
      <Link
        className="rounded-md px-3 py-3 text-sm font-semibold shadow-sm select-none bg-accent1 text-white hover:bg-accent2 hover:text-secondary"
        href="/"
      >
        Join Yallyo
      </Link>
    </button>
  );
};

export default BlogCTAButton;
