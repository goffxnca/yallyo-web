import Avatar from "../Avatar";

interface Props {
  id: string;
  name: string;
  online: boolean;
}

const FriendItem = ({ id, name, online }: Props) => {
  return (
    <div className="flex items-center m-2">
      <Avatar name={name} size="md" showMic={false} url="" avatarColor="" />
      <div className="ml-4 text-white">{name}</div>
    </div>
  );
};

export default FriendItem;
