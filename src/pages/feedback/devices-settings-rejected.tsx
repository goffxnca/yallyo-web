import Button from "@/components/Forms/Button";
import { useRouter } from "next/router";

const DeviceSettingsRejected = () => {
  const router = useRouter();

  const handleGoHomeClick = () => {
    router.replace("/");
  };
  return (
    <div className="flex justify-center items-center h-screen p-10">
      <div className="">
        <div className=" text-white text-center">
          👋 Sorry, You cannot join the room without settings proper input
          devices.
        </div>
        <div className="flex justify-center mt-4">
          <Button text="Go Back Home Page" emitClick={handleGoHomeClick} />
        </div>
      </div>
    </div>
  );
};

export default DeviceSettingsRejected;
