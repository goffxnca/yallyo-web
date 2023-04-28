import { ReactNode } from "react";
import Header from "./Layouts/Header";
import DarkOverlay from "./Layouts/Overlay";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";

interface Props {
  children: ReactNode;
}

const Layout = ({ children }: Props) => {
  // return <div className="p-10 md:p-20 max-w-[1240px] m-auto">{children}</div>;
  return (
    <div className="h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-gray-300">{children}</main>
      {/* <footer className="h-16 bg-gray-500">Footer</footer> */}
    </div>
  );
};

export default Layout;
