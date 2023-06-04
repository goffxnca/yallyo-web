interface Props {
  text?: string;
}

const DarkOverlay = ({ text }: Props) => {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-black opacity-50 z-50">
      <div className="loading-spinner">
        <div className="loading-spinner__dot1"></div>
        <div className="loading-spinner__dot2"></div>
        <div className="text-white text-sm mt-4">{text || "Loading..."}</div>
      </div>
    </div>
  );
};

export default DarkOverlay;
