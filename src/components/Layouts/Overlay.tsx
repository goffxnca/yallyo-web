const DarkOverlay = () => {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-black opacity-50 z-50">
      <div className="loading-spinner">
        <div className="loading-spinner__dot1"></div>
        <div className="loading-spinner__dot2"></div>
      </div>
    </div>
  );
};

export default DarkOverlay;
