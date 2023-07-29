import { createNArray } from "@/utils/array-utils";

const PerfectLayout = () => {
  return (
    <div className="text-white fixed top-0 left-0 w-full bg-blue-500 ">
      <div className="bg-red-200 h-12">
        <div>Header</div>
      </div>
      <div className="flex h-screen">
        <div className="w-3/12 bg-green-200  overflow-scroll">
          {createNArray(100).map((value, index) => (
            <div key={index} className="">
              Room {index}
            </div>
          ))}
        </div>

        <div className="w-6/12 bg-secondary overflow-scroll">
          {createNArray(100).map((value, index) => (
            <div key={index} className="">
              Member {index}
            </div>
          ))}
        </div>

        <div className="w-3/12 bg-green-200 overflow-scroll border-b">
          {createNArray(100).map((value, index) => (
            <div key={index} className="">
              Message {index}
            </div>
          ))}
        </div>
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
