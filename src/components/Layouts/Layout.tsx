import { ReactNode } from "react";
import Header from "./Headers/Header";

interface Props {
  children: ReactNode;
}

const Layout = ({ children }: Props) => {
  // console.log("Layout");
  // return <div className="p-10 md:p-20 max-w-[1240px] m-auto">{children}</div>;
  return (
    <div className="h-screen flex flex-col">
      <Header />
      <main className="flex-grow">{children}</main>
      {/* <footer className="h-16 bg-gray-500">Footer</footer> */}
      <div className="text-white fixed top-0 z-50">
        {process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA?.substring(0, 6)}
      </div>
    </div>
  );
};

export default Layout;
