import {
  ExclamationTriangleIcon,
  LockClosedIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Dropdown from "../Uis/Inputs/DropdownInput2";
import TextInput from "../Uis/Inputs/TextInput";
import DropdownInput from "../Uis/Inputs/DropodownInput";
import { FormEventHandler } from "react";

/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/

interface Props {
  onSubmit: Function;
}

const NewRoomForm = ({ onSubmit }: Props) => {
  return (
    <div className="p-10 w-[400px]">
      <h2 className="text-accent2 text-3xl text-center mb-6">
        Create Chat Room
      </h2>

      <div>
        <form
          className="space-y-6"
          onSubmit={(e: any) => {
            e.preventDefault();
            const topic = e.target.topic.value || "";
            onSubmit(topic);
          }}
        >
          <TextInput
            id="topic"
            label="Room Description"
            emitChange={() => {}}
          />

          <div className="flex gap-x-2">
            <div className="w-1/2">
              <DropdownInput id="topic" label="Topic" emitChange={() => {}} />
            </div>

            <div className="w-1/2">
              <DropdownInput
                id="topic"
                label="Max People"
                emitChange={() => {}}
              />
            </div>
          </div>

          <div className="flex gap-x-2">
            <div className="w-1/2">
              <DropdownInput
                id="topic"
                label="Language"
                emitChange={() => {}}
              />
            </div>

            <div className="w-1/2">
              <DropdownInput id="topic" label="Level" emitChange={() => {}} />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-accent1 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-accent2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent2"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewRoomForm;
