import { useEffect } from "react";

const Hey = () => {
  useEffect(() => {
    function setRootHeight() {
      const root = document.documentElement;
      const vh = window.innerHeight * 0.01;
      root.style.setProperty("--vh", `${vh}px`);
    }

    window.addEventListener("resize", setRootHeight);
    setRootHeight();

    return () => {
      window.removeEventListener("resize", setRootHeight);
    };
  }, []);

  return (
    <div className="flex flex-col h-screen">
      <div className="bg-white">Header</div>
      <div className="bg-red-200 flex-grow">
        Should be full without scrolling
      </div>
    </div>
  );
};

export default Hey;
