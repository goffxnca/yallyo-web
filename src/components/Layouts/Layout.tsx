import { ReactNode } from "react";
import Header from "./Headers/Header";
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();

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
      <div className="text-gray-700 fixed bottom-0 left-[50%] z-50 transform translate-x-[-50%]">
        {publicRuntimeConfig.version}:
        {process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA?.substring(0, 4)}
      </div>
    </div>
  );
};

export default Layout;
