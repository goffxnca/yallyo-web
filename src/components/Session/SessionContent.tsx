import { useSelector } from "react-redux";
import Avatar from "../UIs/Avatar";
import { RootState } from "@/store/store";
import exp from "constants";

const SessionContent = () => {
  const { room, controls } = useSelector((state: RootState) => state.session);

  console.log(room);
  return (
    <div className="absolute bottom-32 md:bottom-10 w-full">
      <div className="flex justify-center">
        <ul className="flex gap-2 flex-wrap">
          {room?.joiners.map((joiner: any) => (
            <Avatar
              key={joiner._id}
              name={joiner.displayName}
              size="lg"
              showMic={true}
              url={joiner.avatarUrl}
              avatarColor={joiner.avatarColor}
              bio=""
              followers={0}
              followings={0}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SessionContent;
