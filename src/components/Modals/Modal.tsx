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
          className="fixed w-full h-full bg-primary bg-opacity-50  top-0 left-0 flex justify-center items-center"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <div className="relative">
            <div className="absolute right-2 top-2">
              <XMarkIcon
                className="h-10 w-10 cursor-pointer hover:scale-110"
                onClick={() => {
                  emitClose();
                }}
              />
            </div>
            <div className=" bg-secondary rounded-lg">{children}</div>
          </div>
        </div>,
        document.getElementById("modal")!
      )}
    </>
  );
};

export default Modal;
