import { IMediaControls } from "@/types/common";
import { MicrophoneIcon } from "@heroicons/react/24/solid";

interface Props {
  controls: IMediaControls;
  displayName: string;
}

const JoinerItemCoolFooter = ({ controls, displayName }: Props) => {
  return (
    <div className="bg-red-200 z-30">
      <div className="absolute bottom-1 left-1 bg-black text-center  bg-opacity-50 px-4 py-1 rounded-lg ">
        <div className="flex items-center">
          {controls && !controls.micOn && (
            <div className="relative mr-1">
              <MicrophoneIcon className="w-4 h-4 md:w-5 md:h-5 text-red-500 flex-1" />
              <div className="absolute top-0 left-0 right-0 bottom-0">
                <div className="flex justify-center items-center w-full h-full">
                  <div className={`border border-red-500 w-8 rotate-45`}></div>
                </div>
              </div>
            </div>
          )}

          <div className="text-xs md:text-sm font-bold overflow-ellipsis text-white">
            {displayName}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinerItemCoolFooter;
