import { Transition } from "@headlessui/react";
import { useState } from "react";

//THIS IS JUST PLAYGROUND TO TEST HOW TRANSITION OF HEADLESS UI WORKS

function MyComponent() {
  const [isShowing, setIsShowing] = useState(false);

  return (
    <div className="absolute bottom-0 left-0">
      <button
        onClick={() => setIsShowing((isShowing) => !isShowing)}
        className="bg-red-400"
      >
        Toggle
      </button>
      <Transition
        show={isShowing}
        enter="transition ease-in-out duration-300 transform"
        enterFrom="translate-y-full"
        enterTo="translate-y-0"
        leave="transition ease-in-out duration-300 transform"
        leaveFrom="translate-y-0"
        leaveTo="translate-y-full"
      >
        <div className=" bg-white">I will fade in and out</div>
      </Transition>
    </div>
  );
}

export default MyComponent;
