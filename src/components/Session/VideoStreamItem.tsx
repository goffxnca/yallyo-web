import { IMediaControls } from "@/types/common";
import { ArrowPathIcon, MicrophoneIcon } from "@heroicons/react/24/outline";

interface Props {
  userId: string;
  status: string;
  displayName: string;
  controls: IMediaControls;
}

const VideoStreamItem = ({ userId, status, displayName, controls }: Props) => {
  return (
    <div className="w-40 h-40 md:w-64 md:h-64 bg-secondary rounded-md relative">
      {/* <div className="text-white">{peer.userId}</div> */}
      <video
        id={`video-${userId}`}
        autoPlay
        playsInline
        controls={false}
        style={{
          objectFit: "cover",
          width: "100%",
          height: "100%",
        }}
        className={`rounded-md  ${status !== "connected" && "opacity-25"} ${
          controls && !controls.camOn && "hidden"
        }`}
      />
      {status !== "connected" && (
        <div className="animate-pulse absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="">
            <ArrowPathIcon className="h-5 w-5 text-white animate-spin mx-auto" />
            {status === "leaving" && (
              <div className="text-white capitalize">{status}</div>
            )}
          </div>
        </div>
      )}

      <div className="absolute bottom-0  text-white text-xs bg-black px-2 py-1 w-full text-center bg-opacity-80">
        <div className="flex items-center justify-center text-white mt-2">
          <div className="text-xs whitespace-nowrap overflow-hidden">
            {displayName}
          </div>

          {controls && !controls.micOn && (
            <div className="relative ml-1">
              <MicrophoneIcon className="w-4 h-4" />
              <div className="absolute top-0 left-0 right-0 bottom-0">
                <div className="flex justify-center items-center w-full h-full">
                  <div className={`border border-white w-8 rotate-45`}></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoStreamItem;
