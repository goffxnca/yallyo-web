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
  isMe: boolean;
  isHost: boolean;
  speaking: boolean;
  muted: boolean;
}
const JoinerItemCool = ({
  userId,
  status,
  displayName,
  controls,
  boxSize,
  photoUrl,
  showStatusIndicator,
  isMe,
  isHost,
  speaking,
  muted,
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

      className={`relative rounded-lg overflow-hidden  ${
        speaking && controls.camOn && "border-4 border-accent2"
      } ${status !== "connected" && "opacity-60"}`}
      style={{
        //   backgroundColor: getRandomColor() || "red",
        height: boxSize,
        width: boxSize,
      }}
    >
      {/* Joiner */}
      <div
        className={`flex items-stretch justify-center h-full w-full bg-secondary rounded-lg overflow-hidden `}
      >
        <div className="relative w-full overflow-hidden">
          {isHost && (
            <div className="absolute right-2 top-2 text-accent2 text-[10px] z-30 bg-black rounded-md px-2">
              Host
            </div>
          )}

          {/* Avatar Mode */}
          {controls && !controls.camOn && (
            <div className="w-full h-full">
              <div className="text-white flex justify-center items-center h-full">
                <div className="text-white flex justify-center">
                  <Avatar
                    userId={userId}
                    name={displayName}
                    size="lg"
                    url={photoUrl}
                    color={getRandomColor()}
                    hilight={speaking}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Video Mode */}
          <div className="relative h-full w-full">
            <div className="rounded-lg overflow-hidden z-20">
              <video
                id={`video-${userId}`}
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
                className="rounded-lg"
                playsInline
                autoPlay
                muted={muted}
              />
            </div>

            <audio
              // className="hidden"
              id={`audio-${userId}`}
              controls={false}
              autoPlay={true}
              muted={muted}
            ></audio>
          </div>
        </div>

        {displayName && (
          <JoinerItemCoolFooter
            controls={controls}
            displayName={displayName}
            isMe={isMe}
          />
        )}
      </div>

      {showStatusIndicator && status !== "connected" && (
        <div className="animate-pulse absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="bg-black bg-opacity-40 p-4 w-full rounded-lg">
            <ArrowPathIcon className="h-5 w-5 text-white animate-spin mx-auto" />
            {status === "leaving" && (
              <div className="text-white capitalize text-sm">{status}</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default JoinerItemCool;
