import { IDropdownItem } from "@/types/frontend";
import BaseInput from "./BaseInput";
import { ChangeEventHandler } from "react";
import React from "react";

interface Props {
  id: string;
  label: string;
  items: IDropdownItem[];
  defaultVal?: string;
  error?: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

const RadioGroupInput = React.forwardRef<HTMLInputElement, Props>(
  ({ id, label, items, defaultVal, error, onChange }, ref) => {
    return (
      <BaseInput id={id} label={label} error={error}>
        <fieldset name={id}>
          <div className="flex items-center space-x-10">
            {items.map(({ value, display }) => (
              <div key={value} className="flex items-center">
                <input
                  id={value}
                  name={id}
                  type="radio"
                  value={value}
                  defaultChecked={value === defaultVal}
                  className="h-4 w-4 border-gray-300 text-accent1 focus:ring-accent1"
                  onChange={onChange}
                  ref={ref}
                />
                <label
                  htmlFor={value}
                  className="ml-3 block text-sm font-medium leading-6 text-white"
                >
                  {display}
                </label>
              </div>
            ))}
          </div>
        </fieldset>
      </BaseInput>
    );
  }
);

RadioGroupInput.displayName = "RadioGroupInput";

export default RadioGroupInput;
