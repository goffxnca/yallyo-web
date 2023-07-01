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
        <div className=" text-white text-center max-w-[500px]">
          {/* 👋 You were automatically disconnected from this room when you joined
          another room at the same time. Thank you for joining! */}
          👋 You cannot join 2 room sessions at the same time, you have to quit
          the current active room first!
        </div>
        <div className="flex justify-center mt-4">
          <Button text="Go Back Home Page" emitClick={handleGoHomeClick} />
        </div>
      </div>
    </div>
  );
};

export default SessionTimeout;
