import { useEffect } from "react";

const Hey = () => {
  return (
    <div id="container" className="flex flex-col h-screen relative">
      <div className="text-white">Top</div>
      <div className="bg-white">Heade22r</div>
      <div className="bg-red-200 flex-grow">Should be</div>
      <div className="text-white">Bottom</div>
    </div>
  );
};

export default Hey;
