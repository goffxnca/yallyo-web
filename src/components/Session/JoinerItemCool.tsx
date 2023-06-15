import { IMediaControls } from "@/types/common";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import Avatar from "../UIs/Avatar";
import { getRandomColor } from "@/utils/color-utils";
import JoinerItemCoolFooter from "./JoinerItemCoolFooter";

interface Props {
  userId: string;
  status: string;
  displayName: string;
  controls: IMediaControls;
  boxSize: string;
  photoUrl: string;
  showStatusIndicator: boolean;
}
const JoinerItemCool = ({
  userId,
  status,
  displayName,
  controls,
  boxSize,
  photoUrl,
  showStatusIndicator,
}: Props) => {
  return (
    <div
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

      className={`relative  rounded-lg ${
        status !== "connected" && "opacity-70"
      }`}
      style={{
        //   backgroundColor: getRandomColor() || "red",
        height: boxSize,
        width: boxSize,
      }}
    >
      {/* //Video From Camera */}
      <div className="flex items-stretch justify-center h-full w-full bg-secondary rounded-lg overflow-hidden">
        {/* James Doe */}
        <div className="relative w-full overflow-hidden">
          {controls && !controls.camOn && (
            <div className="w-full h-full ">
              <div className="text-white flex justify-center items-center h-full">
                <div className="text-white flex justify-center">
                  <Avatar
                    name={displayName}
                    size="lg"
                    showMic={false}
                    url={photoUrl}
                    color={getRandomColor()}
                    bio=""
                    followers={0}
                    followings={0}
                  />
                </div>
              </div>

              <JoinerItemCoolFooter
                controls={controls}
                displayName={displayName}
              />
            </div>
          )}

          <div className="relative h-full w-full">
            <div className="rounded-lg z-20">
              <video
                id={`video-${userId}`}
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
              />
            </div>

            <JoinerItemCoolFooter
              controls={controls}
              displayName={displayName}
            />
          </div>
        </div>
      </div>

      {showStatusIndicator && status !== "connected" && (
        <div className="animate-pulse absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="">
            <ArrowPathIcon className="h-5 w-5 text-white animate-spin mx-auto" />
            {status === "leaving" && (
              <div className="text-white capitalize">{status}</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default JoinerItemCool;
