import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import TestPage from "./deals";

const CustomerPage = () => {
  // console.log("CustomerPage ");
  const router = useRouter();

  useEffect(() => {
    // console.log("CustomerPage's useEffect ");
  }, []);
  return (
    <div className="text-white mt-20">
      CustomerPage
      {/* <Link href="/test">Go Test Page</Link> */}
      {/* <a href="/test">Go Test Page</a> */}
      <div
        onClick={() => {
          router.push("/customers/deals");
        }}
      >
        Go To Deals
      </div>
      <TestPage />
    </div>
  );
};

export default CustomerPage;
