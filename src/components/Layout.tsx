import { ReactNode } from "react";
import Header from "./Layouts/Header";

interface Props {
  children: ReactNode;
}

const Layout = ({ children }: Props) => {
  // return <div className="p-10 md:p-20 max-w-[1240px] m-auto">{children}</div>;
  return (
    <div className="">
      <Header />
      {children}
    </div>
  );
};

export default Layout;
