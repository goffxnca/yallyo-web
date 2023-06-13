import { useEffect, useState } from "react";

import DarkOverlay from "../Layouts/Overlay";

interface Props {
  onPreviewFinished: Function;
}

const PreviewScreen = ({ onPreviewFinished }: Props) => {
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setShowLoading(false);
      onPreviewFinished();
    }, 5000);
  }, []);

  return (
    <div className="flex justify-center items-center h-screen p-10">
      <div className="">
        {showLoading && <DarkOverlay text="Initializing..." />}
      </div>
    </div>
  );
};

export default PreviewScreen;
