interface Props {
  text?: string;
}

const DarkOverlay = ({ text }: Props) => {
  return (
    <div className="absolute top-0 left-0 w-screen h-screen bg-black bg-opacity-50 z-50">
      <div className="loading-spinner">
        <div className="flex-row items-center justify-center content-center min-w-[100px]">
          <div className="loading-spinner__dot1 left-[10%]"></div>
          <div className="loading-spinner__dot2 left-[10%]"></div>
          <div className="text-white text-sm mt-4 text-center">
            {text ?? "Loading..."}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DarkOverlay;
