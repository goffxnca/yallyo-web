import { useEffect, useState } from "react";

const ComingSoon = () => {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    // Set the date we're counting down to
    var countDownDate = new Date("July 1, 2023 00:00:00").getTime();
    // Update the countdown every 1 second
    var x = setInterval(function () {
      // Get today's date and time
      var now = new Date().getTime();
      // Find the distance between now and the count down date
      var distance = countDownDate - now;
      // Time calculations for days, hours, minutes and seconds
      var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      var hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);
      // Display the result in the corresponding elements
      document.getElementById("days")!.textContent = days + "d";
      document.getElementById("hours")!.textContent = hours + "h";
      document.getElementById("minutes")!.textContent = minutes + "m";
      document.getElementById("seconds")!.textContent = seconds + "s";
      // If the count down is over, write some text
      if (distance < 0) {
        clearInterval(x);
        document.getElementById("countdown")!.innerHTML = "EXPIRED";
      }
    }, 1000);
  });

  return (
    <div>
      <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center">
        <h1 className="text-5xl text-white font-bold mb-8 animate-pulse">
          <span className="text-accent2">Yallyo</span> is coming soon
        </h1>
        <p className="text-white text-lg mb-8">
          We're working hard to bring Yallyo online on July 1, 2023. Stay tuned!
        </p>

        <div className="flex justify-center items-center px-2 bg-gradient-to-tr">
          <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="py-4 px-6">
              <div className="flex flex-wrap gap-4 justify-center items-center">
                <div className="border rounded-lg px-4 py-2">
                  <div
                    id="days"
                    className="font-bold font-mono text-2xl text-accent1"
                  ></div>
                </div>
                <div className="border rounded-lg px-4 py-2">
                  <div
                    id="hours"
                    className="font-bold font-mono text-2xl text-accent1"
                  ></div>
                </div>
                <div className="border rounded-lg px-4 py-2">
                  <div
                    id="minutes"
                    className="font-bold font-mono text-2xl text-accent1"
                  ></div>
                </div>
                <div className="border rounded-lg px-4 py-2">
                  <div
                    id="seconds"
                    className="font-bold font-mono text-2xl text-accent1"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;
