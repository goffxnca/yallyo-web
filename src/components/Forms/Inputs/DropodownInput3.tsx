import BaseInput from "./BaseInput";
import React, { ChangeEventHandler } from "react";
import { DropdownItem } from "@/types/frontend";

interface Props {
  id: string;
  label: string;
  items: DropdownItem[];
  defaultVal?: string;
  error?: string;
  onChange: ChangeEventHandler<HTMLSelectElement>;
}

const DropdownInput3 = React.forwardRef<HTMLSelectElement, Props>(
  ({ id, label, items, defaultVal, error, onChange }, ref) => {
    return (
      <BaseInput label={label} error={error}>
        <select
          id={id}
          name={id}
          defaultValue={defaultVal}
          className="rounded-md w-full"
          onChange={onChange}
          ref={ref}
        >
          <option value="">Please Select</option>
          {items.map(({ value, display }) => (
            <option key={value} value={value}>
              {display}
            </option>
          ))}
        </select>
      </BaseInput>
    );
  }
);

DropdownInput3.displayName = "DropdownInput3";

export default DropdownInput3;
