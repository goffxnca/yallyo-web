import Image from "next/image";

interface Props {
  responsive: boolean;
  onClick: Function;
}
const SigninWithGoogleButton = ({ responsive, onClick }: Props) => {
  //   return (
  //     <button
  //       className="flex border border-gray-400 rounded-md px-2 py-1 hover:bg-gray-700"
  //       onClick={() => {
  //         onClick();
  //       }}
  //     >
  //       <Image src="/google.svg" alt="My Icon" width={24} height={24} />
  //       <div className="text-white ml-2">Signin with Google</div>
  //     </button>
  //   );
  return (
    <button
      className="flex items-center bg-[#4285F4] rounded-sm border  border-[#4285F4] google-button group"
      onClick={() => {
        onClick();
      }}
    >
      <div className="bg-white p-3">
        <Image src="/google.svg" alt="My Icon" width={18} height={18} />
      </div>
      <div
        className={`${
          responsive && "hidden"
        } md:block text-white px-2 text-sm group-hover:shadow`}
      >
        Signin with Google
      </div>
    </button>
  );
};

export default SigninWithGoogleButton;
