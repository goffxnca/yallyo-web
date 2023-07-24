import { ArrowPathIcon } from "@heroicons/react/24/outline";
import TextInput from "../Forms/Inputs/TextInput";
import { useState } from "react";
import {
  LANGAUGE_LEVEL,
  LANGUAGES,
  ROOM_TYPES,
  TOPICS,
} from "@/utils/constants";
import DropdownInput3 from "../Forms/Inputs/DropodownInput3";
import { createNArrayFrom } from "@/utils/array-utils";
import { FieldValues, useForm } from "react-hook-form";
import { maxLength, minLength } from "@/utils/form-utils";
import DarkOverlay from "../Layouts/Overlay";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import SigninWithGoogleButton from "../Layouts/Headers/SigninWithGoogleButton";
import { signinWithGoogle } from "@/store/authSlice";
import Notification from "@/components/UIs/Notification";
import RadioGroupInput from "../Forms/Inputs/RadioGroupInput";
import { IRoomFeatures } from "@/types/common";

interface Props {
  onSubmit: (data: FieldValues) => void;
}

const NewRoomForm = ({ onSubmit }: Props) => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [loading, setLoading] = useState(false);
  const [loginSuccessfully, setLoginSuccessfully] = useState(false);
  const dispatch: AppDispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onFormSubmit = (data: FieldValues) => {
    console.log("data", data);

    const features: IRoomFeatures = {
      chat: true,
      audio: true,
      video: data.roomType === "video",
    };

    const formData = { ...data, features };

    setLoading(true);
    setTimeout(() => {
      onSubmit(formData);
    }, 5000);
  };

  if (!user) {
    return (
      <div className="p-10">
        <div className=" text-white text-center">
          🔒 You need to login to create chat room.
        </div>

        <div className="flex justify-center mt-4">
          <SigninWithGoogleButton
            responsive={false}
            onClick={() => {
              dispatch(signinWithGoogle()).then(() => {
                setLoginSuccessfully(true);
              });
            }}
          />
        </div>
      </div>
    );
  }

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
              {...register("topic", {})}
              error={errors.topic?.message?.toString()}
            />
          </div>

          <div className="w-1/2">
            <DropdownInput3
              id="size"
              label="Maximum Participants"
              items={createNArrayFrom(3, 3).map((item) => ({
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

        <div className="flex gap-x-2">
          <div className="w-full">
            <RadioGroupInput
              id="roomType"
              label="Room Type"
              items={ROOM_TYPES.map(({ value, display }) => ({
                value: value,
                display: display,
              }))}
              {...register("roomType", {
                required: "This field is required",
              })}
              defaultVal="voice"
              error={errors.roomType?.message?.toString()}
            />
          </div>
        </div>

        <TextInput
          id="desc"
          label="Room Introduction"
          placeholder="Let's make some noise"
          spellCheck={false}
          {...register("desc", {
            // required: "This field is required",
            minLength: { ...minLength(5) },
            maxLength: { ...maxLength(50) },
          })}
          error={errors.desc?.message?.toString()}
        />
        <div>
          <button
            type="submit"
            className={`flex w-full justify-center rounded-md px-3 py-3 text-sm font-semibold shadow-sm select-none ${
              loading
                ? "bg-accent2 text-secondary pointer-events-none"
                : "bg-accent1 text-white"
            }`}
            disabled={loading}
          >
            {loading && (
              <div className="animate-pulse">
                <ArrowPathIcon className="h-5 w-5 mr-2 animate-spin" />
              </div>
            )}

            <span className="text-md">
              {loading ? "Creating Room" : "Create Room"}
            </span>
          </button>
        </div>
      </form>

      {loading && <DarkOverlay text="" />}

      {loginSuccessfully && (
        <Notification
          type="success"
          messageTitle="Login successfully!"
          messageBody="You are now ready to create a chat room."
          autoFadeout={true}
          onFadedOut={() => {}}
        />
      )}
    </div>
  );
};

export default NewRoomForm;
