import { useEffect, useState } from "react";

import DarkOverlay from "../Layouts/Overlay";

interface Props {
  onLoadingFinished: Function;
}

const StaticLoadingScreen = ({ onLoadingFinished }: Props) => {
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setShowLoading(false);
      onLoadingFinished();
    }, 5000);
  }, []);

  return (
    <div className="flex justify-center items-center h-screen p-10">
      <div className="">{showLoading && <DarkOverlay text="Loading..." />}</div>
    </div>
  );
};

export default StaticLoadingScreen;
