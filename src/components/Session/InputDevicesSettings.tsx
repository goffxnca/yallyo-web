import { useEffect, useRef, useState } from "react";
import {
  ArrowPathIcon,
  MicrophoneIcon,
  VideoCameraIcon,
} from "@heroicons/react/24/outline";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";

import SessionControlItem from "./SessionControlItem";
import { updateDeviceSettings } from "@/store/sessionSlice";

interface Props {
  micRequired: boolean;
  camRequired: boolean;
  onDevicesReady: Function;
}

const InputDevicesSettings = ({
  micRequired,
  camRequired,
  onDevicesReady,
}: Props) => {
  console.log("InputDevicesSettings");
  const dispatch: AppDispatch = useDispatch();
  const localStream = useRef<MediaStream | null>(null);

  const [micAllowedOnce, setMicAllowedOnce] = useState(false);
  const [camAllowedOnce, setCamAllowedOnce] = useState(false);

  const [micIsOn, setMicIsOn] = useState(false);
  const [micId, setMicId] = useState("");
  const [micName, setMicName] = useState("");

  const [camIsOn, setCamIsOn] = useState(false);
  const [camId, setCamId] = useState("");
  const [camName, setCamName] = useState("");

  const loading = false;
  const boxSize = 200;

  let isDevicesReady = false;
  if (camRequired) {
    isDevicesReady = micAllowedOnce && camAllowedOnce;
  } else {
    isDevicesReady = micAllowedOnce;
  }

  const onButtonSubmitClick = () => {
    if (isDevicesReady) {
      dispatch(
        updateDeviceSettings({
          micOn: micIsOn,
          micId: micId,
          camOn: camIsOn,
          camId: camId,
        })
      );
      setTimeout(() => {
        onDevicesReady();
      }, 5000);
    } else {
      if (camRequired) {
        requestMicrophoneAndCameraPermissions();
      } else {
        requestMicPermission();
      }
    }
  };

  useEffect(() => {
    return () => {
      if (localStream && localStream.current) {
        localStream.current.getTracks().forEach((track) => track.stop());
        localStream.current = null;

        const videoPreview = getVideoElement();
        if (videoPreview) {
          videoPreview.srcObject = null;
        }
      }
    };
  }, []);

  const requestMicPermission = async () => {
    if (micAllowedOnce) {
      toggleMic();
    } else {
      console.log("requestMicPermission");
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });

        const videoPreview = getVideoElement();

        const [audioTrack] = stream.getAudioTracks();
        if (audioTrack) {
          if (localStream.current) {
            localStream.current.addTrack(audioTrack);
            videoPreview.srcObject = localStream.current;
          } else {
            localStream.current = stream;
            videoPreview.srcObject = stream;
          }

          setMicAllowedOnce(true);
          setMicIsOn(true);
          setMicId(audioTrack.id);
          setMicName(audioTrack.label);
          console.log("requestMicPermission success");
        } else {
          console.error("requestMicPermission failed: No audio track found");
        }
      } catch (error: unknown) {
        console.error("requestMicPermission failed");
        window.location.href = "/feedback/devices-settings-rejected";
      }
    }
  };

  const requestCameraPermission = async () => {
    if (camAllowedOnce) {
      toggleCam();
    } else {
      console.log("requestCameraPermission");
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });

        const videoPreview = getVideoElement();

        const [videoTrack] = stream.getVideoTracks();
        if (videoTrack) {
          if (localStream.current) {
            localStream.current.addTrack(videoTrack);
            videoPreview.srcObject = localStream.current;
          } else {
            localStream.current = stream;
            videoPreview.srcObject = stream;
          }

          setCamAllowedOnce(true);
          setCamIsOn(true);
          setCamId(videoTrack.id);
          setCamName(videoTrack.label);
          console.log("requestCameraPermission success");
        } else {
          console.error("requestCameraPermission failed: No video track found");
        }
      } catch (error: unknown) {
        console.error("requestCameraPermission failed");
        window.location.href = "/feedback/devices-settings-rejected";
      }
    }
  };

  const requestMicrophoneAndCameraPermissions = async () => {
    console.log("requestMicrophoneAndCameraPermissions");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      localStream.current = stream;

      const [audioTrack] = stream.getAudioTracks();
      if (audioTrack) {
        const audioPreview = getVideoElement();
        audioPreview.srcObject = stream;

        setMicAllowedOnce(true);
        setMicIsOn(true);
        setMicId(audioTrack.id);
        setMicName(audioTrack.label);
        console.log("requestMicrophoneAndCameraPermissions success for audio");
      } else {
        console.error(
          "requestMicrophoneAndCameraPermissions failed: No audio track found"
        );
      }

      const [videoTrack] = stream.getVideoTracks();
      if (videoTrack) {
        const videoPreview = getVideoElement();
        videoPreview.srcObject = stream;
        setCamAllowedOnce(true);
        setCamIsOn(true);
        setCamId(videoTrack.id);
        setCamName(videoTrack.label);
        console.log("requestMicrophoneAndCameraPermissions success for video");
      } else {
        console.error(
          "requestMicrophoneAndCameraPermissions failed: No video track found"
        );
      }
    } catch (error: unknown) {
      console.error("requestMicrophoneAndCameraPermissions failed");
      window.location.href = "/feedback/devices-settings-rejected";
    }
  };

  const toggleMic = () => {
    if (localStream && localStream.current) {
      const [audioTrack] = localStream.current.getAudioTracks();
      if (micIsOn) {
        if (audioTrack) {
          setMicIsOn(false);
          console.log("toggleMic off success");
        } else {
          console.error("toggleMic failed: No audio track found");
        }
      } else {
        setMicIsOn(true);
        console.log("toggleMic on success");
      }
    }
  };

  const toggleCam = () => {
    if (localStream && localStream.current) {
      const [videoTrack] = localStream.current.getVideoTracks();
      if (videoTrack) {
        if (camIsOn) {
          videoTrack.enabled = false;
          setCamIsOn(false);
          console.log("toggleCam off success");
        } else {
          videoTrack.enabled = true;
          setCamIsOn(true);
          console.log("toggleCam on success");
        }
      } else {
        console.error("toggleCam failed: No video track found");
      }
    }
  };

  const getVideoElement = () => {
    return document.getElementById(`video-preview`) as HTMLVideoElement;
  };

  return (
    <div className="p-5 lg:px-10 w-[500px] space-y-6 text-center">
      <h2 className="text-accent2 text-2xl text-center">
        {camRequired ? "Microphone & Camera " : "Microphone"} Settings
      </h2>
      {/* Media Preview */}
      <div className="relative bg-black rounded-lg h-[200px]">
        <div className="bg-red-gray-300 flex justify-center">
          <div className="relative h-full w-full">
            <div className="rounded-lg overflow-hidden z-20">
              <video
                id={`video-preview`}
                autoPlay
                playsInline
                controls={false}
                //   style={{
                //     objectFit: "cover",
                //     width: "100%",
                //     height: "auto",
                //   }}
                style={{
                  objectFit: "cover",
                  width: boxSize,
                  height: boxSize,
                }}
                // className="rounded-lg"
                muted={true}
                className="mx-auto"
              />
            </div>

            {/* <audio
              className="hidden"
              id={`audio-preview`}
              controls={true}
              autoPlay={true}
            ></audio> */}

            {/* {displayName && (
              <JoinerItemCoolFooter
                controls={controls}
                displayName={displayName}
                isMe={isMe}
              />
            )} */}
          </div>
        </div>

        {/* Devices Toggling */}
        <div className="flex justify-center absolute bottom-2 left-0 right-0 z-20">
          <div className="flex items-center justify-center text-white rounded-md space-x-2">
            {micRequired && (
              <SessionControlItem
                Icon={<MicrophoneIcon />}
                disabled={!micIsOn}
                tooltip={micIsOn ? "Mute" : "Unmute"}
                onClick={() => {
                  requestMicPermission();
                }}
                bgClasses={`${micAllowedOnce ? "bg-green-400" : "bg-red-400"}`}
              />
            )}

            {camRequired && (
              <SessionControlItem
                Icon={<VideoCameraIcon />}
                disabled={!camIsOn}
                tooltip={camIsOn ? "Cam Off" : "Cam On"}
                onClick={() => {
                  requestCameraPermission();
                }}
                bgClasses={`${camAllowedOnce ? "bg-green-400" : "bg-red-400"}`}
              />
            )}
          </div>
        </div>
      </div>

      {/* Descriptions */}
      {!isDevicesReady && (
        <div className="text-white space-y-10">
          <h3 className="text-lg font-bold">
            {camRequired ? "Microphone and Camera are" : "Microphone is"}{" "}
            required for joining this room
          </h3>
          <p>
            In order for others to {camRequired ? "hear and see" : "hear"} you,
            your browser will request{" "}
            {camRequired ? "microphone and camera" : "microphone"} access.
          </p>
        </div>
      )}

      {isDevicesReady && (
        <div className="text-white">
          <h3 className="text-lg font-bold mb-2 text-green-500">
            {isDevicesReady &&
              camRequired &&
              " Your Microphone and Camera are now ready"}

            {isDevicesReady && !camRequired && " Your Microphone is now ready"}
          </h3>
          <div className="text-sm">
            <p>Microphone: {micName || "Please turn on"}</p>
            {camRequired && <p>Camera: {camName || "Please turn on"}</p>}
            {isDevicesReady && micIsOn && camIsOn && (
              <p className="text-gray-500 text-xs italic mt-4">
                **You are going to join the room with active microphone and
                camera.
              </p>
            )}

            {isDevicesReady && micIsOn && !camIsOn && (
              <p className="text-gray-500 text-xs italic mt-4">
                **You are going to join the room with active microphone and
                camera turned off.
              </p>
            )}

            {isDevicesReady && !micIsOn && camIsOn && (
              <p className="text-gray-500 text-xs italic mt-4">
                **You are going to join the room with muted microphone and
                camera turned on.
              </p>
            )}

            {isDevicesReady && !micIsOn && !camIsOn && (
              <p className="text-gray-500 text-xs italic mt-4">
                **You are going to join the room with microphone and camera
                turned off.
              </p>
            )}
          </div>
        </div>
      )}

      <div>
        <button
          className="flex w-full justify-center rounded-md bg-accent1 px-3 py-3 text-sm font-semibold text-white shadow-sm hover:bg-accent2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent2"
          onClick={onButtonSubmitClick}
        >
          {loading && (
            <div className="animate-pulse">
              <ArrowPathIcon className="h-5 w-5 mr-2 animate-spin" />
            </div>
          )}

          <span className="text-md">
            {isDevicesReady
              ? "Enter room"
              : loading
              ? "Requesting"
              : "Request Access"}
          </span>
        </button>
      </div>
    </div>
  );
};

export default InputDevicesSettings;
