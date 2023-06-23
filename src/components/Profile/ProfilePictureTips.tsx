const ProfilePictureTips = () => {
  return (
    <div className="p-5 md:p-10 w-full md:w-[600px] text-gray-300 max-h-[600px] overflow-y-scroll">
      <h2 className="text-accent2 text-2xl text-center mb-6">
        How to Change Profile Picture
      </h2>

      <p className="mt-3 text-gray-400">
        Yallyo currently doesn&apos;t support this function yet To update your
        profile picture on Yallyo, please change your Google Account profile
        picture from
        <a
          href="https://myaccount.google.com/"
          className="text-white ml-1 underline"
          target="_blank"
        >
          here
        </a>
        . Yallyo currently doesn&apos;t support this function yet. Please note
        that it may take a few minutes to hours for your new Google account
        profile picture to take effect, check this
        <a
          href="https://support.google.com/mail/thread/2904884/profile-picture-is-uploaded-but-icon-photo-won-t-change?hl=en"
          className="text-white ml-1 underline"
          target="_blank"
        >
          solution
        </a>
        .
      </p>
    </div>
  );
};

export default ProfilePictureTips;
