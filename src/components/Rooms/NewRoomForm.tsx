import { ArrowPathIcon } from "@heroicons/react/24/outline";
import TextInput from "../Forms/Inputs/TextInput";
import { useState } from "react";
import { LANGAUGE_LEVEL, LANGUAGES, TOPICS } from "@/utils/constants";
import DropdownInput3 from "../Forms/Inputs/DropodownInput3";
import { createNArrayFrom } from "@/utils/array-utils";
import { FieldValues, useForm } from "react-hook-form";
import { maxLength, minLength } from "@/utils/form-utils";
import DarkOverlay from "../Layouts/Overlay";

interface Props {
  onSubmit: (data: FieldValues) => void;
}

const NewRoomForm = ({ onSubmit }: Props) => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onFormSubmit = (data: FieldValues) => {
    setLoading(true);
    onSubmit(data);
  };

  return (
    <div className="p-5 md:p-10 w-full md:w-[500px]">
      <h2 className="text-accent2 text-3xl text-center mb-6">
        Create Chat Room
      </h2>

      <form className="space-y-6" onSubmit={handleSubmit(onFormSubmit)}>
        <div className="flex gap-x-2">
          <div className="w-1/2">
            <DropdownInput3
              id="language"
              label="Language"
              items={LANGUAGES.map((lang) => ({ value: lang, display: lang }))}
              {...register("language", {
                required: "Language is required",
              })}
              error={errors.language?.message?.toString()}
            />
          </div>

          <div className="w-1/2">
            <DropdownInput3
              id="level"
              label="Level"
              items={LANGAUGE_LEVEL.map((level) => ({
                value: level,
                display: level,
              }))}
              {...register("level", {
                required: "Level is required",
              })}
              error={errors.level?.message?.toString()}
            />
          </div>
        </div>

        <div className="flex gap-x-2">
          <div className="w-1/2">
            <DropdownInput3
              id="topic"
              label="Topic"
              items={TOPICS.map((topic) => ({
                value: topic,
                display: topic,
              }))}
              {...register("topic", {
                required: "Topic is required",
              })}
              error={errors.topic?.message?.toString()}
            />
          </div>

          <div className="w-1/2">
            <DropdownInput3
              id="size"
              label="Maximum Participants"
              items={createNArrayFrom(3, 8).map((item) => ({
                value: item.toString(),
                display: item.toString(),
              }))}
              {...register("size", {
                required: "This field is required",
              })}
              error={errors.size?.message?.toString()}
            />
          </div>
        </div>
        <TextInput
          id="desc"
          label="Room Tagline & Intro"
          placeholder="Let's make some noise guys"
          {...register("desc", {
            required: "This field is required",
            minLength: { ...minLength(5) },
            maxLength: { ...maxLength(50) },
          })}
          error={errors.desc?.message?.toString()}
        />
        <div>
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-accent1 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-accent2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent2"
          >
            {loading && (
              <div className="animate-pulse">
                <ArrowPathIcon className="h-5 w-5 mr-2 animate-spin" />
              </div>
            )}

            <span className="text-md">{loading ? "Creating" : "Create"}</span>
          </button>
        </div>
      </form>

      {loading && <DarkOverlay />}
    </div>
  );
};

export default NewRoomForm;
