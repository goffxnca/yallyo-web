import Image from "next/image";
import ButtonLong from "../Uis/ButtonLong";

interface Props {
  name: string;
  bio: string;
  url: string;
}

const UserProfile = ({ name, bio, url }: Props) => {
  return (
    <div className="p-10 md:w-[800px]">
      <div className="md:flex gap-x-4 items-center text-center md:text-left">
        <img
          src={url}
          className="rounded-full border-4 border-accent2 w-40 h-40 p-1 mx-auto"
          alt="cool"
        />
        <div className="text-white">
          <h2 className="text-4xl my-2">{name}</h2>
          <p>
            Hes been on Friends, Seinfeld and That 70 Show. Has been in cartoons
            like Lilo and Stitch and Invader Zim. In movies like Galaxy Quest
            and Sky High
          </p>
        </div>
        <div>{/* <ButtonLong text="Follow" /> */}</div>
      </div>
    </div>
  );
};

export default UserProfile;
