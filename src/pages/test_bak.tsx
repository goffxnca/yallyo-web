import PageContainer from "@/components/Layouts/PageContainer";
import SessionControlList from "@/components/Session/SessionControlList";
import Avatar from "@/components/UIs/Avatar";

import { IMediaControls } from "@/types/common";
import { createNArray } from "@/utils/array-utils";
import { randomBoolean } from "@/utils/bool-utils";
import { getRandomColor } from "@/utils/color-utils";
import { joinClasses } from "@/utils/jsx-utils";
import { faker } from "@faker-js/faker";
import { MicrophoneIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";

const JoinerList2 = () => {
  const [screen, setScreen] = useState({ width: 0, height: 0, layout: "" });
  const [boxSize, setBoxSize] = useState("200px");
  const [ready, setReady] = useState(false);
  const [joiners, setJoiners] = useState(1);

  const renderLocalVideoStream = async () => {
    console.log("Request browser permissions for local streaming");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: true,
      });

      for (let index = 0; index < joiners; index++) {
        const element = document.getElementById(
          `video-${index + 1}`
        ) as HTMLVideoElement;
        if (element) {
          element.srcObject = stream;
        }
      }

      // const localUserVideo = this.getVideoElement(
      //   this.settings?.localUserId as string
      // );
      // localUserVideo.srcObject = stream;
      console.log("Render local stream successfully");
    } catch (error) {
      console.error("Render local stream failed", error);
    }
  };

  const calculateBoxSize = (total: number) => {
    const { innerWidth, innerHeight } = window;
    const layout = innerWidth > innerHeight ? "lanscape" : "portrait";

    let finalBoxSize = 0;
    if (innerWidth >= 1280) {
      //lg
      if (layout === "lanscape") {
        finalBoxSize = total === 1 ? innerHeight / 2 : innerHeight / 3;
      } else {
        finalBoxSize = total === 1 ? innerWidth / 2 : innerWidth / 4;
      }
    } else if (innerWidth >= 1024) {
      //lg
      if (layout === "lanscape") {
        finalBoxSize = total === 1 ? innerHeight / 2 : innerHeight / 3;
      } else {
      }
    } else if (innerWidth >= 768) {
      //md
      finalBoxSize =
        total === 1
          ? innerWidth
          : total === 2
          ? innerWidth / 2
          : innerWidth / 3;
    } else {
      //sm
      finalBoxSize =
        total === 1
          ? innerWidth
          : total === 2
          ? innerWidth / 1.5
          : innerWidth / 2;
    }
    setBoxSize(finalBoxSize + "px");
  };

  useEffect(() => {
    if (typeof window !== "undefined" && window.navigator) {
      setReady(true);
      renderLocalVideoStream();
      const { innerWidth, innerHeight } = window;
      setScreen({
        width: innerWidth,
        height: innerHeight,
        layout: innerWidth > innerHeight ? "lanscape" : "portrait",
      });
      setBoxSize(innerWidth / 2 + "px");
      calculateBoxSize(joiners);
    }
  }, [joiners]);

  const medias: IMediaControls = {
    camOn: true,
    micOn: true,
    screenOn: false,
    speaking: false,
  };
  return (
    <div className="relative mx-auto">
      <SessionControlList
        onToggleCam={() => {}}
        onToggleMic={() => {}}
        onToggleScreen={() => {}}
        controls={medias}
      />
      <div className="text-white absolute bottom-0 right-0">
        {JSON.stringify(screen)}
      </div>

      <div
        className="bg-gray-500 text-white absolute top-0 z-50 p-2"
        onClick={() => {
          if (joiners < 5) {
            setJoiners((j) => {
              return j + 1;
            });
          }
        }}
      >
        Increase
      </div>
      <div
        className="bg-gray-500 text-white absolute bottom-0 z-50 p-2"
        onClick={() => {
          if (joiners > 1) {
            setJoiners((j) => {
              return j - 1;
            });
          }
        }}
      >
        Decrease
      </div>

      {/* <div className="flex flex-col md:flex-row md:flex-wrap md:content-center items-center justify-center h-screen bg-gray-500"> */}
      <div
        className={joinClasses(
          //   joiners <= 2
          //     ? "flex flex-col md:flex-row md:flex-wrap "
          //     : joiners <= 4
          //     ? "flex flex-row flex-wrap"
          //     : "flex flex-row flex-wrap",
          "h-screen bg-pramary "
        )}
      >
        <div
          className={`flex flex-row flex-wrap w-full h-full content-center items-center justify-center pt-[65px] max-w-screen-lg mx-auto`}
          style={{ height: screen.height }}
        >
          {ready &&
            createNArray(joiners).map((val) => {
              const name = faker.name.fullName();
              const camOff = randomBoolean();
              return (
                <div
                  key={val}
                  // className="text-white w-full md:h-1/2  md:w-1/2 md:max-w-1/2 max-w-[500px] max-h-[500px]"
                  // className={joinClasses(
                  //   joiners <= 2
                  //     ? "text-white w-full h-1/3 md:w-1/2 md:h-1/2 lg:w-1/3 lg:h-1/3"
                  //     : joiners <= 4
                  //     ? "text-white w-1/2 h-1/4 md:w-1/2 md:h-1/3 lg:w-1/3 lg:h-1/3"
                  //     : "text-white w-1/2 h-1/4 md:w-1/2 md:h-1/4  lg:h-1/3 lg:w-[h1/3]",
                  //   "p-1"
                  // )}
                  // className={joinClasses(
                  //   joiners <= 2
                  //     ? "text-white w-full h-1/3 md:w-1/2 md:h-1/2 lg:w-1/3 lg:h-1/3"
                  //     : joiners <= 4
                  //     ? "text-white w-1/2 h-1/4 md:w-1/2 md:h-1/3 lg:w-1/3 lg:h-1/3"
                  //     : "text-white w-1/2 h-1/4 md:w-1/2 md:h-1/4  lg:h-1/3 lg:w-[h1/3]",
                  //   "p-1"
                  // )}
                  className="p-1"
                  style={{
                    //   backgroundColor: getRandomColor() || "red",
                    height: boxSize,
                    width: boxSize,
                  }}
                >
                  {/* //Video From Camera */}
                  <div className="flex items-stretch justify-center h-full w-full bg-secondary">
                    {/* James Doe */}
                    <div className="relative w-full overflow-hidden">
                      {camOff ? (
                        <div className="w-full h-full ">
                          <div className="text-white flex justify-center items-center h-full">
                            <div className="text-white flex justify-center">
                              <Avatar
                                userId={Math.random().toString()}
                                name={name}
                                size="lg"
                                url={faker.image.avatar()}
                                color={getRandomColor()}
                                hilight={false}
                              />
                            </div>
                          </div>

                          <div className="bg-red-200">
                            <div className="absolute bottom-0 bg-black text-center  bg-opacity-50 p-1">
                              <div className="flex items-center">
                                <div className="relative ml-1">
                                  <MicrophoneIcon className="w-4 h-4 md:w-5 md:h-5 text-red-500 flex-1" />
                                  {/* <div className="absolute top-0 left-0 right-0 bottom-0">
                              <div className="flex justify-center items-center w-full h-full">
                                <div
                                  className={`border border-red-500 w-8 rotate-45`}
                                ></div>
                              </div>
                            </div> */}
                                </div>
                                <div className="text-xs md:text-sm font-bold overflow-ellipsis text-white">
                                  {name}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div>
                          <video
                            id={`video-${val}`}
                            autoPlay
                            playsInline
                            controls={false}
                            //   style={{
                            //     objectFit: "cover",
                            //     width: "100%",
                            //     height: "auto",
                            //   }}
                            style={{
                              objectFit: "cover",
                              width: boxSize,
                              height: boxSize,
                            }}
                            // className="rounded-lg"
                          />
                          <div className="bg-red-200">
                            <div className="absolute bottom-0 bg-black text-center  bg-opacity-50 p-1">
                              <div className="flex items-center">
                                <div className="relative ml-1">
                                  <MicrophoneIcon className="w-4 h-4 md:w-5 md:h-5 text-red-500" />
                                  {/* <div className="absolute top-0 left-0 right-0 bottom-0">
                              <div className="flex justify-center items-center w-full h-full">
                                <div
                                  className={`border border-red-500 w-8 rotate-45`}
                                ></div>
                              </div>
                            </div> */}
                                </div>
                                <div className="text-xs md:text-sm font-bold overflow-ellipsis text-white">
                                  {name}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default JoinerList2;
