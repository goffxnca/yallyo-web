import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const PageContainer = ({ children }: Props) => {
  return (
    <div className="p-2 pt-10 md:p-10 md:pt-20  grid gap-y-6 bg-primary">
      {children}
    </div>
  );
};

export default PageContainer;
