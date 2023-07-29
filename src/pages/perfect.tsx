import { createNArray } from "@/utils/array-utils";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { useCallback, useEffect, useState } from "react";

const PerfectLayout = () => {
  const [grid1WidthNum, setGrid1WidthNum] = useState(3);
  const [grid2WidthNum, setGrid2WidthNum] = useState(9);
  const [grid3WidthNum, setGrid3WidthNum] = useState(3);

  const [grid1Width, setGrid1Width] = useState("");
  const [grid2Width, setGrid2Width] = useState("");
  const [grid3Width, setGrid3Width] = useState("");

  const reCalucateAllWidths = useCallback(() => {
    setGrid1Width(`w${grid1WidthNum}/12`);
    setGrid1Width(`w${grid2WidthNum}/12`);
    setGrid1Width(`w${grid3WidthNum}/12`);
  }, [grid1WidthNum, grid2WidthNum, grid3WidthNum]);

  useEffect(() => {
    reCalucateAllWidths();
  }, [grid1WidthNum, grid2WidthNum, grid2WidthNum, reCalucateAllWidths]);

  return (
    <div className="text-white fixed top-0 left-0 w-full bg-blue-500 ">
      <div className="bg-red-200 h-12">
        <div>Header</div>
      </div>
      <div className="flex h-screen">
        <div
          className={`${grid1Width} bg-green-200 overflow-x-hidden resize-x h-20`}
        >
          <button
            onClick={() => {
              setGrid1Width("w-1/12");
              setGrid2Width("w-8/12");
              setGrid3Width("w-3/12");
            }}
            className=""
          >
            <ChevronLeftIcon className="w-5 h-5" />
          </button>

          <button
            onClick={() => {
              setGrid1Width("w-3/12");
              setGrid2Width("w-6/12");
            }}
            className=""
          >
            <ChevronRightIcon className="w-5 h-5" />
          </button>
          {createNArray(100).map((value, index) => (
            <div key={index} className="">
              Lobby Message {index}
            </div>
          ))}
        </div>

        <div
          className={`${grid2Width} bg-secondary overflow-scroll overflow-x-hidden resize-x h-20`}
        >
          <button
            onClick={() => {
              setGrid1Width("w-1/12");
              setGrid2Width("w-8/12");
            }}
            className=""
          >
            <ChevronLeftIcon className="w-5 h-5" />
          </button>

          <button
            onClick={() => {
              setGrid1Width("w-3/12");
              setGrid2Width("w-6/12");
            }}
            className=""
          >
            <ChevronRightIcon className="w-5 h-5" />
          </button>

          {createNArray(100).map((value, index) => (
            <div
              key={index}
              className=""
              onClick={() => {
                setGrid2Width("w-4/12");
                setGrid3Width("w-5/12");
              }}
            >
              Room {index}
            </div>
          ))}
        </div>

        {/* <div
          className={`${
            grid3Width || "hidden"
          } bg-green-200 overflow-scroll border-b`}
        >
          {createNArray(100).map((value, index) => (
            <div key={index} className="">
              Room Member {index}
            </div>
          ))}
        </div> */}
      </div>
    </div>
  );
  // return (
  //   <div className="flex bg-white h-[400px] sticky top-0">
  //     <div className="flex-none w-1/6 h-screen sticky top-0 text-red-500">
  //       {createNArray(60).map((value, index) => (
  //         <div key={index} className="">
  //           Left Sidebar
  //         </div>
  //       ))}
  //     </div>

  //     <div className="flex-auto text-black">
  //       {createNArray(60).map((value, index) => (
  //         <div key={index} className="">
  //           Main Content
  //         </div>
  //       ))}
  //     </div>

  //     <div className="flex-none w-1/6 h-screen sticky top-0 text-green-500">
  //       {createNArray(60).map((value, index) => (
  //         <div key={index} className="">
  //           Rigth Sidebar
  //         </div>
  //       ))}
  //     </div>
  //   </div>
  // );
};

PerfectLayout.noLayout = true;
export default PerfectLayout;
