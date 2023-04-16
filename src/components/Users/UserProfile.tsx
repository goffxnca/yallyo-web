import Image from "next/image";
import ButtonLong from "../Uis/ButtonLong";

const UserProfile = () => {
  return (
    <div className="p-10 w-[800px]">
      <div className="flex gap-x-4 items-center">
        <img
          src="https://d31wcbk3iidrjq.cloudfront.net/c6Gs3-B42_avatar-iZbXPK3np.jpg?h=332&w=332&q=100"
          className="rounded-full border-4 border-accent2 w-40 h-40 p-1"
        />
        <div className="text-white">
          <h2 className="text-4xl my-2">Rosie O'Donnell</h2>
          <p>
            He's been on Friends, Seinfeld and That 70's Show. Has been in
            cartoons like Lilo and Stitch and Invader Zim. In movies like Galaxy
            Quest and Sky High
          </p>
        </div>
        <div>{/* <ButtonLong text="Follow" /> */}</div>
      </div>
    </div>
  );
};

export default UserProfile;
