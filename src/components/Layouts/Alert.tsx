import { hideAlert } from "@/store/alertSlice";
import { AppDispatch, RootState } from "@/store/store";
import { Transition } from "@headlessui/react";
import { FaceSmileIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Alert = () => {
  const { visible, alertInfo } = useSelector((state: RootState) => state.alert);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if (visible) {
      setTimeout(() => {
        dispatch(hideAlert());
      }, 15000);
    }
  }, [dispatch, visible]);

  return (
    <div className="fixed bottom-0 left-[50%] transform translate-x-[-50%] w-[400px] z-50">
      <div className="relative">
        <Transition
          show={visible}
          enter="transition ease-in-out duration-300 transform"
          enterFrom="translate-y-full"
          enterTo="translate-y-0"
          leave="transition ease-in-out duration-300 transform"
          leaveFrom="translate-y-0"
          leaveTo="translate-y-full"
        >
          <div
            className="text-white z-50 bg-white borderw-full text-center p-4 rounded-lg select-none cursor-default"
            onClick={() => {
              dispatch(hideAlert());
            }}
          >
            <div className="flex">
              <FaceSmileIcon
                className="h-6 w-6 text-green-400"
                aria-hidden="true"
              />
              <div className="ml-3 text-left">
                <p className="text-sm font-medium text-gray-900">
                  {alertInfo.title}
                </p>
                <div className="mt-1 text-sm text-gray-500">
                  {alertInfo.message}
                </div>
              </div>
            </div>

            <XMarkIcon
              className="absolute right-2 top-2 h-5 w-5 text-gray-500 cursor-pointer"
              onClick={() => {
                dispatch(hideAlert());
              }}
            />
          </div>
        </Transition>
      </div>
    </div>
  );
};

export default Alert;
