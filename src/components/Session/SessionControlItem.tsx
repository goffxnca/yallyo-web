import React from "react";

interface Props {
  Icon: React.ReactElement;
  disabled?: boolean;
  pendingNum?: number;
  bgColor?: string;
  tooltip?: string;
  onClick?: Function;
}

const SessionControlItem = React.memo(
  ({
    Icon,
    disabled = false,
    pendingNum = 0,
    bgColor,
    tooltip,
    onClick,
  }: Props) => {
    return (
      // <div className="p-3 mx-1 rounded-md">
      //   {/* <Icon className="w-6 h-6" /> */}
      //   {React.cloneElement(Icon, { className: "w-6 h-6" })}
      // </div>

      <div
        className={`relative p-4 rounded-md cursor-pointer hover:bg-gray-400 group ${
          bgColor && bgColor
        }`}
        onClick={() => {
          onClick && onClick();
        }}
      >
        {React.cloneElement(Icon, {
          className: `w-6 h-6 ${disabled && "text-gray-500"}`,
        })}
        {disabled && (
          <div className="absolute top-0 left-0 right-0 bottom-0">
            <div className="flex justify-center items-center w-full h-full">
              <div
                className={`border  ${
                  disabled ? "border-gray-500" : "border-white"
                } w-8 rotate-45`}
              ></div>
            </div>
          </div>
        )}

        {!!pendingNum && (
          <div className="absolute top-2 right-2">
            <div className="rounded-full bg-red-500 w-4 h-4 text-xs flex items-center justify-center">
              {pendingNum}
            </div>
          </div>
        )}

        <div className="hidden absolute -top-8 left-0 text-sm bg-secondary px-2 rounded-md group-hover:block whitespace-nowrap">
          {tooltip}
        </div>
      </div>
    );
  }
);

SessionControlItem.displayName = "SessionControlItem";

export default SessionControlItem;
