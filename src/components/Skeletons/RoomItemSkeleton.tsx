import { useEffect, useRef } from "react";
import ContentLoader from "react-content-loader";

interface Props {
  focus: boolean;
}

const RoomItemSkeleton = ({ focus }: Props) => {
  const elemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (focus && elemRef.current) {
      console.log("focus...");
      elemRef.current.scrollIntoView({ block: "center" });
    }
  }, [elemRef, focus]);
  return (
    <div
      className="p-4 rounded-md bg-secondary gap-y-4 grid hover:shadow-2xl h-full"
      ref={elemRef}
    >
      <ContentLoader
        backgroundColor="#252525"
        foregroundColor="#101010"
        height="100%"
        width="100%"
        viewBox="0 0 600 200"
        speed={0.5}
      >
        <rect x="0" y="0" rx="3" ry="3" width="50%" height="25" />
        <rect x="0" y="40" rx="3" ry="3" width="100%" height="25" />
        <circle cx="20%" cy="110" r="30" height="60" />
        <circle cx="40%" cy="110" r="30" height="60" />
        <circle cx="60%" cy="110" r="30" height="60" />
        <circle cx="80%" cy="110" r="30" height="60" />
        <rect x="30%" y="155" ry="2" width="40%" height="40" />
      </ContentLoader>
    </div>
  );
};

export default RoomItemSkeleton;
