import Button from "../../Forms/Button";
import { useRouter } from "next/router";

const RoomInactive = () => {
  const router = useRouter();

  const handleGoHomeClick = () => {
    router.replace("/");
  };

  return (
    <div className="flex justify-center items-center h-screen p-10">
      <div className="">
        <div className=" text-white text-center">
          🤪 Sorry, this room is no longer available. It may have been deleted
          by the room owner or expired.
        </div>

        <div className="flex justify-center mt-4">
          <Button text="Go Back Home Page" emitClick={handleGoHomeClick} />
        </div>
      </div>
    </div>
  );
};

export default RoomInactive;
