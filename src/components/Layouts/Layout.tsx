import { ReactNode } from "react";
import Header from "./Headers/Header";
import getConfig from "next/config";
import MobileNavigators from "../mobileNavs/MobileNavigators";
import Link from "next/link";
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

      <div className="fixed bottom-0 right-0 text-xs space-x-4 text-gray-500 bg-secondary rounded-md px-2">
        {/* <Link href="/about" className="hover:underline">
          About Us
        </Link> */}

        <Link href="/blog" className="hover:underline">
          Blog
        </Link>

        <Link href="/terms-of-service" className="hover:underline">
          Terms of Service
        </Link>

        <Link href="/privacy-policy" className="hover:underline">
          Privacy Policy
        </Link>

        <span className="text-xs">
          v{publicRuntimeConfig.version}:
          {process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA?.substring(0, 4)}
        </span>
      </div>

      <div className="md:hidden">
        <MobileNavigators />
      </div>
    </div>
  );
};

export default Layout;
