import Image from "next/image";
import ButtonLong from "../Uis/ButtonLong";
import { useState } from "react";

interface Props {
  name: string;
  bio: string;
  url: string;
}

const UserProfile = ({ name, bio, url }: Props) => {
  return (
    <div className="p-10 md:w-[800px]flex">
      <div className="md:flex gap-x-4 items-center text-center md:text-left">
        <div
          className={`rounded-full border-4 border-accent2 w-40 h-40 p-1 mx-auto`}
        >
          {url && (
            <img
              src={url}
              alt="cool"
              className="object-cover h-full w-full rounded-full"
            />
          )}
        </div>

        <div className="text-white">
          <h2 className="text-4xl my-2">{name}</h2>
          {/* <p>
            Hes been on Friends, Seinfeld and That 70 Show. Has been in cartoons
            like Lilo and Stitch and Invader Zim. In movies like Galaxy Quest
            and Sky High
          </p> */}
          <p className="text-sm text-gray-500">Member Since: 13/33/2022</p>
        </div>
        <div>{/* <ButtonLong text="Follow" /> */}</div>
      </div>
    </div>
  );
};

export default UserProfile;
