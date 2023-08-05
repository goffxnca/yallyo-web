import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const BlogMain = ({ children }: Props) => {
  return <main>{children}</main>;
};

export default BlogMain;
