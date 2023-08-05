import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const BlogContainer = ({ children }: Props) => {
  return (
    <div className="bg-white px-6 py-16 lg:px-8 text-[#657786]">
      <div className="w-full lg:w-[800px] mx-auto rounded-lg py-10 md:p-10 space-y-10">
        {children}
      </div>
    </div>
  );
};

export default BlogContainer;
