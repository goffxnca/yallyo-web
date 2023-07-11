const checkMediaAccess = async () => {
  let audioGranted = false;
  let videoGranted = false;
  const devices = await navigator.mediaDevices.enumerateDevices();

  devices.forEach((device) => {
    if (device.kind == "audioinput" && device.label) audioGranted = true;
    //   console.log("Has Audio Access");
    if (device.kind == "videoinput" && device.label) videoGranted = true;
    //   console.log("Has Video Access");
  });
  return { audioGranted, videoGranted };
};

export { checkMediaAccess };
