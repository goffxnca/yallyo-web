import FriendItem from "./FriendItem";

interface Props {
  onEmitClose: Function;
}

const Friends = ({ onEmitClose }: Props) => {
  const friends = [
    { id: "wef", name: "Jonathan Lee", online: true },
    { id: "wef", name: "Jonathan Lee", online: true },
    { id: "wef", name: "Jonathan Lee", online: true },
    { id: "wef", name: "Jonathan Lee", online: true },
    { id: "wef", name: "Jonathan Lee", online: true },
    { id: "wef", name: "Jonathan Lee", online: true },
    { id: "wef", name: "Jonathan Lee", online: true },
    { id: "wef", name: "Jonathan Lee", online: true },
    { id: "wef", name: "Jonathan Lee", online: true },
    { id: "wef", name: "Jonathan Lee", online: true },
    { id: "wef", name: "Jonathan Lee", online: true },
    { id: "wef", name: "Jonathan Lee", online: true },
  ];

  return (
    <div className=" fixed right-10 bottom-0 bg-secondary w-[400px] h-[600px] overflow-y-scroll p-2 border  rounded-lg shadow-2xl ">
      {/* Top Controls */}
      <div className="flex">
        <div>People</div>
        <div>Chat</div>
        <div
          className="ml-auto"
          onClick={() => {
            onEmitClose();
          }}
        >
          X
        </div>
      </div>

      {/* Friend List */}
      <div className="">
        {friends.map((friend) => {
          return (
            <FriendItem
              key={friend.id}
              id={friend.id}
              name={friend.name}
              online={friend.online}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Friends;
