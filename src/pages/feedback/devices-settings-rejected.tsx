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
          👋 Sorry, You cannot join the room without allowing access or setting
          proper input devices.
          <p className="text-gray-500 text-xs italic mt-4">
            If you consistently encounter this page, it may be because you
            repeatedly clicked &quot;block&quot; when Yallyo requested
            microphone and camera access. As a result, your browser continues to
            block access. Consult your browser&apos;s official documentation for
            your OS to learn how to unblock access. To prevent this, avoid
            clicking &quot;block&quot; again in the future.
          </p>
        </div>
        <div className="flex justify-center mt-4">
          <Button text="Go Back Home Page" emitClick={handleGoHomeClick} />
        </div>
      </div>
    </div>
  );
};

export default DeviceSettingsRejected;
