const TroubleshootingContent = () => {
  return (
    <div className="p-5 md:p-10 w-full md:w-[1000px] text-gray-300 max-h-[600px] overflow-y-scroll">
      <h2 className="text-accent2 text-2xl text-center mb-6">
        Camera/Microphone Troubleshooting
      </h2>

      <p>
        After declining camera and microphone permissions, it&apos;s important
        to note that browsers will remember your decision, which can make it
        challenging to regain access later on. To help you resolve this issue,
        here are steps you can follow based on your browser and device type:
      </p>
      <br></br>

      <div className="">
        <div className="lg:hidden">
          <h3 className="font-bold my-4">For Mobile/Tablet Users:</h3>
          <div className="ml-2 space-y-4">
            <h4>Chrome</h4>
            <h4>Safari</h4>
            <h4>Firefox</h4>
          </div>
        </div>

        <br></br>
        <div className="hidden lg:block">
          <h3 className="font-bold my-4">For Desktop Users:</h3>
          <div className="ml-2 space-y-4">
            <p>
              <b>Chrome</b> - Click camera icon with the red cross symbol on the
              right side of address bar then click &quot;Always Allow
              https://yallyo.com to access your camera and microphone&quot;.
            </p>
            <img
              src={"/images/chrome-issue1.png"}
              alt="yeh"
              className="mx-auto w-1/2"
            />
            <p>
              <b>Safari</b> - Go to Safari Settings by accessing the menu bar at
              the top of your screen. Then, navigate to the Websites tab and
              adjust the permissions to &apos;Allow,&apos; for both Camera and
              Microphone.
            </p>
            <img
              src={"/images/chrome-issue2.png"}
              alt="yeh"
              className="mx-auto w-1/2"
            />
            <p>
              <b>Firefox</b> - Do Something...
            </p>
          </div>
        </div>

        <br></br>
        <p>
          After making the necessary adjustments as suggested, please refresh
          this page once then your camera and microphone should now work
          properly. However, in some browsers, you may still be prompted to
          grant access to your cam/mic again. In that case, simply click
          &apos;Allow,&apos; and you should be good to go.
        </p>
      </div>
    </div>
  );
};

export default TroubleshootingContent;
