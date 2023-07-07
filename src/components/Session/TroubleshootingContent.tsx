interface Props {
  mediaType: string;
}
const TroubleshootingContent = ({ mediaType }: Props) => {
  const media = mediaType === "cam" ? "camera" : "microphone";
  return (
    <div className="p-5 md:p-10 w-full md:w-[800px] lg:w-[1000px] text-gray-300 max-h-[600px] overflow-y-scroll">
      <h2 className="text-accent2 text-2xl text-center mb-6">
        Fixing {mediaType === "mic" ? "Microphone" : "Camera"} Permission Issues
      </h2>

      <h3 className="font-bold my-4">Why am I seeing this pop-up?</h3>
      <p className="ml-2">
        After declining camera/microphone permissions, it&apos;s important to
        note that browsers will remember your decision, which can make it
        challenging to regain access later on. To help you resolve this issue,
        here are steps you can follow.
      </p>
      <br></br>

      <div className="">
        <div className="lg:hidden">
          <h3 className="font-bold my-4">For Mobile/Tablet Users:</h3>
          <div className="ml-2 space-y-4">
            {mediaType === "cam" && (
              <>
                <p>
                  <b>Chrome on Android</b> - To fix camera permission issue for
                  Chrome browser on mobile/tablet android device, please visit{" "}
                  <a
                    href="https://support.google.com/chrome/answer/2693767?hl=en&co=GENIE.Platform%3DAndroid"
                    target="_blank"
                    className="text-blue-500"
                  >
                    Chrome Official Support Website
                  </a>
                </p>

                <p>
                  <b>Chrome on Iphone & Ipad</b> - To fix camera permission
                  issue for Chrome browser on mobile Iphone & Ipad device,
                  please visit{" "}
                  <a
                    href="https://support.google.com/chrome/answer/2693767?hl=en&co=GENIE.Platform%3DiOS"
                    target="_blank"
                    className="text-blue-500"
                  >
                    Chrome Official Support Website
                  </a>
                </p>

                <p>
                  <b>Safari</b> - To fix camera permission issue for Safari
                  browser on mobile/tablet device, please checkout this{" "}
                  <a
                    href="https://www.youtube.com/watch?v=BJOUR8tdKRc"
                    target="_blank"
                    className="text-blue-500"
                  >
                    Youtube video
                  </a>
                </p>
              </>
            )}

            {mediaType === "mic" && (
              <>
                <p>
                  <b>Chrome on Android</b> - To fix microphone permission issue
                  for Chrome browser on mobile/tablet android device, please
                  visit{" "}
                  <a
                    href="https://support.google.com/chrome/answer/2693767?hl=en&co=GENIE.Platform%3DAndroid"
                    target="_blank"
                    className="text-blue-500"
                  >
                    Chrome Official Support Website
                  </a>
                </p>

                <p>
                  <b>Chrome on Iphone & Ipad</b> - To fix microphone permission
                  issue for Chrome browser on mobile Iphone & Ipad device,
                  please visit{" "}
                  <a
                    href="https://support.google.com/chrome/answer/2693767?hl=en&co=GENIE.Platform%3DiOS"
                    target="_blank"
                    className="text-blue-500"
                  >
                    Chrome Official Support Website
                  </a>
                </p>
                <p>
                  <b>Safari</b> - To fix microphone permission issue for Safari
                  browser on mobile/tablet device, please checkout this{" "}
                  <a
                    href="https://www.youtube.com/watch?v=FxfXPmp4w2Y"
                    target="_blank"
                    className="text-blue-500"
                  >
                    Youtube video
                  </a>
                </p>
              </>
            )}
          </div>
        </div>

        <br></br>
        <div className="hidden lg:block">
          <h3 className="font-bold my-4">For Desktop Users:</h3>
          <div className="ml-2 space-y-4">
            {mediaType === "cam" && (
              <>
                <p>
                  <b>Chrome</b> - Click camera icon with the red cross symbol on
                  the right side of address bar then click &quot;Always Allow
                  https://yallyo.com to access your camera and microphone&quot;
                  and click &quot;Done&quot; then close popup and try to turn
                  camera on again.
                </p>

                <img
                  src={"/images/mediaIssues/desktop-chrome-cam.png"}
                  alt="yeh"
                  className="mx-auto w-1/2"
                />
                <p>
                  <b>Safari</b> - To fix camera permission issue for Safari
                  browser on desktop, please visit{" "}
                  <a
                    href="https://support.apple.com/en-kw/guide/safari/ibrwe2159f50/mac"
                    target="_blank"
                    className="text-blue-500"
                  >
                    Safari Official Support Website
                  </a>
                </p>
                <p>
                  <b>Firefox</b> - To fix camera permission issue for Firefox
                  browser on desktop, please visit{" "}
                  <a
                    href="https://support.mozilla.org/en-US/kb/how-manage-your-camera-and-microphone-permissions"
                    target="_blank"
                    className="text-blue-500"
                  >
                    Firefox Official Support Website
                  </a>
                </p>
              </>
            )}

            {mediaType === "mic" && (
              <>
                <p>
                  <b>Chrome</b> - Click microphone icon with the red cross
                  symbol on the right side of address bar then click
                  &quot;Always Allow https://yallyo.com to access your
                  microphone&quot; and click &quot;Done&quot; then close popup
                  and try refresh this page again.
                </p>
                <img
                  src={"/images/mediaIssues/desktop-chrome-mic.png"}
                  alt="yeh"
                  className="mx-auto w-1/2"
                />
                <p>
                  <b>Safari</b> - To fix microphone permission issue for Safari
                  browser on desktop, please visit{" "}
                  <a
                    href="https://support.apple.com/en-kw/guide/safari/ibrwe2159f50/mac"
                    target="_blank"
                    className="text-blue-500"
                  >
                    Safari Official Support Website
                  </a>
                </p>
                <p>
                  <b>Firefox</b> - To fix microphone permission issue for
                  Firefox browser on desktop, please visit{" "}
                  <a
                    href="https://support.mozilla.org/en-US/kb/how-manage-your-camera-and-microphone-permissions"
                    target="_blank"
                    className="text-blue-500"
                  >
                    Firefox Official Support Website
                  </a>
                </p>
              </>
            )}
          </div>
        </div>

        <br></br>
        <p>
          After making the necessary adjustments as suggested, please refresh
          this page once, then your camera and microphone should now work
          properly. However, in some browsers, you may still be prompted to
          grant access to your camera/microphone again. In that case, simply
          click &apos;Allow,&apos; and you should be good to go.
        </p>
        <br></br>
        <p>
          Please note that repeatedly denying camera/microphone permissions can
          trigger browser security measures, leading to a temporary block of the
          website. If you encounter this issue, you may need to wait for
          approximately 24 hours before trying again.
        </p>
      </div>
    </div>
  );
};

export default TroubleshootingContent;
