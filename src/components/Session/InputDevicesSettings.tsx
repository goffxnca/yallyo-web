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
import DarkOverlay from "../Layouts/Overlay";
import AudioLevel from "./AudioLevel";

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
  // console.log("InputDevicesSettings");
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

  const [loading, setLoading] = useState(false);

  const micNodeRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const volumeMeterNodeRef = useRef<AudioWorkletNode | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  const boxSize = 200;

  let isDevicesReady = false;
  if (camRequired) {
    isDevicesReady = micAllowedOnce && camAllowedOnce;
  } else {
    isDevicesReady = micAllowedOnce;
  }

  const onButtonSubmitClick = () => {
    console.log("onButtonSubmitClick");
    if (isDevicesReady) {
      setLoading(true);
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
        setLoading(false);
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

      const micNode = micNodeRef.current;
      const volumeMeterNode = volumeMeterNodeRef.current;
      const audioContext = audioContextRef.current;

      if (micNode && volumeMeterNode && audioContext) {
        micNode.disconnect();
        volumeMeterNode.disconnect();
        audioContext.close();
      }
    };
  }, []);

  const requestMicPermission = async () => {
    if (micAllowedOnce) {
      toggleMic();
    } else {
      console.log("requestMicPermission");
      setLoading(true);
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

          await renderAudioVisualizer(stream);
          console.log("requestMicPermission success");
        } else {
          console.error("requestMicPermission failed: No audio track found");
        }
      } catch (error: unknown) {
        console.error("requestMicPermission failed");
        window.location.href = "/feedback/devices-settings-rejected";
      }
      setLoading(false);
    }
  };

  const requestCameraPermission = async () => {
    if (camAllowedOnce) {
      toggleCam();
    } else {
      console.log("requestCameraPermission");
      setLoading(true);
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
      setLoading(false);
    }
  };

  const requestMicrophoneAndCameraPermissions = async () => {
    console.log("requestMicrophoneAndCameraPermissions");
    setLoading(true);
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

        await renderAudioVisualizer(stream);
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
    setLoading(false);
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

  const renderAudioVisualizer = async (audioStream: MediaStream) => {
    // const meterElement = document.getElementById(
    //   "volume-meter"
    // ) as HTMLMeterElement;

    const audioContext = new AudioContext();
    await audioContext.audioWorklet.addModule("/volume-meter-10fps.js");
    const micNode = audioContext.createMediaStreamSource(audioStream);
    const volumeMeterNode = new AudioWorkletNode(
      audioContext,
      "volume-meter-10fps"
    );
    volumeMeterNode.port.onmessage = ({ data }) => {
      // meterElement.value = data * 500;
      // console.log(`data: ${data} data*500: ${data * 500}`);
      const volume = data * 500;
      calculateAudioLevelBar(volume);
    };
    micNode.connect(volumeMeterNode).connect(audioContext.destination);

    audioContextRef.current = audioContext;
    micNodeRef.current = micNode;
    volumeMeterNodeRef.current = volumeMeterNode;
  };

  function calculateAudioLevelBar(volume: number) {
    const allBars = [...(document.querySelectorAll(".mic-bar") as any)];
    const numberOfBarsToColor = Math.round(volume / 10);
    const barsToColor = allBars.slice(0, numberOfBarsToColor);
    for (const bar of allBars) {
      bar.style.backgroundColor = "#e6e7e8";
    }
    for (const bar of barsToColor) {
      bar.style.backgroundColor = "#69ce2b";
    }
  }

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
        <div
          className={`flex justify-center absolute ${
            !camRequired && "top-2"
          } bottom-2 left-0 right-0 z-20`}
        >
          <div className="flex items-center justify-center text-white rounded-md space-x-2">
            {micRequired && (
              <SessionControlItem
                Icon={<MicrophoneIcon />}
                disabled={!micIsOn}
                hoverTooltip={micIsOn ? "Mute" : "Unmute"}
                actionedTooltip={
                  !loading ? (micIsOn ? "Unmuted" : "Muted") : ""
                }
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
                hoverTooltip={camIsOn ? "Camera Off" : "Camera On"}
                actionedTooltip={
                  !loading ? (camIsOn ? "Camera On" : "Camera Off") : ""
                }
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

            {isDevicesReady && camRequired && (
              <div>
                {micIsOn && camIsOn && (
                  <p className="text-gray-500 text-xs italic mt-4">
                    **You are going to join the room with microphone and camera
                    on.
                  </p>
                )}

                {micIsOn && !camIsOn && (
                  <p className="text-gray-500 text-xs italic mt-4">
                    **You are going to join the room with microphone on and
                    camera off.
                  </p>
                )}

                {!micIsOn && camIsOn && (
                  <p className="text-gray-500 text-xs italic mt-4">
                    **You are going to join the room with microphone off and
                    camera on.
                  </p>
                )}

                {!micIsOn && !camIsOn && (
                  <p className="text-gray-500 text-xs italic mt-4">
                    **You are going to join the room with microphone and camera
                    off.
                  </p>
                )}
              </div>
            )}

            {isDevicesReady && !camRequired && (
              <div>
                {micIsOn && (
                  <p className="text-gray-500 text-xs italic mt-4">
                    **You are going to join the room with microphone on.
                  </p>
                )}

                {!micIsOn && (
                  <p className="text-gray-500 text-xs italic mt-4">
                    **You are going to join the room with microphone off.
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      <div>
        <button
          className={`flex w-full justify-center rounded-md  px-3 py-3 text-sm font-semibold shadow-sm select-none ${
            loading
              ? "bg-accent2 text-secondary pointer-events-none"
              : "bg-accent1 text-white"
          }`}
          onClick={onButtonSubmitClick}
          disabled={loading}
        >
          {loading && (
            <div className="animate-pulse">
              <ArrowPathIcon className="h-5 w-5 mr-2 animate-spin" />
            </div>
          )}

          <span className="text-md">
            {isDevicesReady
              ? `Enter${loading ? "ing" : ""} room`
              : `Request${loading ? "ing" : ""} Access`}
          </span>
        </button>
      </div>

      {micIsOn && (
        <div className={`flex items-center`}>
          <div>
            <MicrophoneIcon className="w-5 h-5 text-white" />
          </div>
          <AudioLevel />

          {/* <input
          id="volume-meter"
          className="w-full bg-green-500 text-green-500"
          // className={`w-full ${getIndicatorColor(value)}`}
          type="range"
          min="0"
          max="100"
          value="0"
          step="1"
          disabled
        /> */}
        </div>
      )}

      {loading && <DarkOverlay text="" />}
    </div>
  );
};

export default InputDevicesSettings;
