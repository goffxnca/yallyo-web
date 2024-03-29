import PageContainer from "@/components/Layouts/PageContainer";
import SessionControlList from "@/components/Session/SessionControlList";
import { IMediaControls } from "@/types/common";
import { createNArray } from "@/utils/array-utils";
import { randomBoolean } from "@/utils/bool-utils";
import { getRandomColor } from "@/utils/color-utils";
import { joinClasses } from "@/utils/jsx-utils";
import { faker } from "@faker-js/faker";
import { MicrophoneIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";

const JoinerList = () => {
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

  useEffect(() => {
    if (typeof window !== "undefined" && window.navigator) {
      setReady(true);
      renderLocalVideoStream();
    }
  }, [joiners]);

  const medias: IMediaControls = {
    camOn: true,
    micOn: true,
    screenOn: false,
    speaking: false,
  };
  return (
    <div className="relative ">
      <SessionControlList
        onToggleCam={() => {}}
        onToggleMic={() => {}}
        controls={medias}
      />

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
      <div className="h-screen ">
        <div
          className={joinClasses(
            joiners <= 2
              ? "flex flex-col md:flex-row md:flex-wrap "
              : joiners <= 4
              ? "flex flex-row flex-wrap"
              : "flex flex-row flex-wrap",
            "content-center items-center justify-center bg-pramary"
          )}
        >
          {ready &&
            createNArray(joiners).map((val) => {
              const name = faker.name.fullName();
              const camOff = randomBoolean();
              return (
                <div
                  key={val}
                  // className="text-white w-full md:h-1/2  md:w-1/2 md:max-w-1/2 max-w-[500px] max-h-[500px]"
                  className={joinClasses(
                    joiners <= 2
                      ? "text-white w-full md:w-1/2 md:h-[w-1/2] lg:w-1/3"
                      : joiners <= 4
                      ? "text-white w-1/2 md:w-1/2 md:h-[w-1/3] lg:w-1/3"
                      : "text-white w-1/2 h-[w-1/2] md:w-1/3 md:h-[w-1/3]",
                    "p-1"
                  )}
                  style={{ backgroundColor: getRandomColor() || "red" }}
                >
                  {/* //Video From Camera */}
                  <div className="flex items-stretch justify-center h-full w-full">
                    {/* James Doe */}
                    <div className="relative ">
                      {camOff ? (
                        <div>This is just an Avatar</div>
                      ) : (
                        <div>
                          <video
                            id={`video-${val}`}
                            autoPlay
                            playsInline
                            controls={false}
                            style={{
                              objectFit: "contain",
                              width: "100%",
                              height: "auto",
                            }}
                            // className="rounded-lg"
                          />

                          <div className="bg-red-200">
                            <div className="absolute bottom-0 bg-black text-center  bg-opacity-70 p-1 md:p-3 ">
                              <div className="flex items-center">
                                {/* Mic */}
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
                                <div className="text-xs md:text-lg font-bold overflow-ellipsis">
                                  {name} {JSON.stringify(camOff)}
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

export default JoinerList;
