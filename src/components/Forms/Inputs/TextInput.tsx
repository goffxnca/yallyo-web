import React, { ChangeEventHandler } from "react";
import BaseInput from "./BaseInput";

interface Props {
  id: string;
  label: string;
  placeholder?: string;
  spellCheck?: boolean;
  error?: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

const TextInput = React.forwardRef<HTMLInputElement, Props>(
  ({ id, label, placeholder, spellCheck, onChange, error }, ref) => {
    return (
      <BaseInput id={id} label={label} error={error}>
        <input
          id={id}
          name={id}
          type="text"
          placeholder={placeholder}
          spellCheck={spellCheck}
          autoComplete="off"
          className="w-full rounded-md py-2 text-gray-900 placeholder:text-gray-500 text-sm"
          onChange={onChange}
          ref={ref}
        />
      </BaseInput>
    );
  }
);

TextInput.displayName = "TextInput";

export default TextInput;
