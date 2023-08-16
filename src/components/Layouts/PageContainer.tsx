import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const PageContainer = ({ children }: Props) => {
  return <div className="px-2 md:px-4 py-20 grid bg-primary">{children}</div>;
};

export default PageContainer;
