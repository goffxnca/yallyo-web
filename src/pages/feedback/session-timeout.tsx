import Button from "@/components/Forms/Button";
import { useRouter } from "next/router";

const SessionTimeout = () => {
  const router = useRouter();

  const handleGoHomeClick = () => {
    router.replace("/");
  };
  return (
    <div className="flex justify-center items-center h-screen p-10">
      <div className="">
        <div className=" text-white text-center">
          You were disconnected from the room because you attempted to use two
          sessions simultaneously
        </div>
        <div className="flex justify-center mt-4">
          <Button text="Go Back Home Page" emitClick={handleGoHomeClick} />
        </div>
      </div>
    </div>
  );
};

export default SessionTimeout;
