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
      <div className="text-gray-300 fixed bottom-2 left-2 text-xs">
        v{publicRuntimeConfig.version}:
        {process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA?.substring(0, 4)}
      </div>

      <div className="fixed bottom-2 right-2 text-xs space-x-4 text-gray-300 ">
        <a href="/about" target="_blank" className="hover:underline">
          About Us
        </a>

        <a href="/terms-of-service" target="_blank" className="hover:underline">
          Terms of Service
        </a>

        <a href="/privacy-policy" target="_blank" className="hover:underline">
          Privacy Policy
        </a>
      </div>
    </div>
  );
};

export default Layout;
