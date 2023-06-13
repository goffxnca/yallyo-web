import Button from "../../Forms/Button";
import { useRouter } from "next/router";

const RoomNotFound = () => {
  const router = useRouter();

  const handleGoHomeClick = () => {
    router.replace("/");
  };

  return (
    <div className="flex justify-center items-center h-screen p-10">
      <div className="">
        <div className=" text-white text-center">
          🤪 Sorry, we cannot find the room you are looking for or it no longer
          available.
        </div>

        <div className="flex justify-center mt-4">
          <Button text="Go Back Home Page" emitClick={handleGoHomeClick} />
        </div>
      </div>
    </div>
  );
};

export default RoomNotFound;
