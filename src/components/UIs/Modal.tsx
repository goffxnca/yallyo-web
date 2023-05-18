import { XMarkIcon } from "@heroicons/react/24/outline";
import { createPortal } from "react-dom";

interface Props {
  showCloseButton: boolean;
  children: React.ReactNode;
  emitClose: Function;
}

const Modal = ({ showCloseButton, emitClose, children }: Props) => {
  return (
    <>
      {createPortal(
        <div
          className="fixed w-full h-full bg-primary bg-opacity-80  top-0 left-0 flex justify-center items-center z-50"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <div className="relative">
            <div className="absolute right-4 top-1">
              <XMarkIcon
                className="h-10 w-10 cursor-pointer hover:scale-110 text-white"
                onClick={() => {
                  emitClose();
                }}
              />
            </div>
            <div className=" bg-secondary rounded-lg mx-4">{children}</div>
          </div>
        </div>,
        document.getElementById("modal")!
      )}
    </>
  );
};

export default Modal;
