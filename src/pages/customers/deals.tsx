import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";

const DealsPage = () => {
  // console.log("TestPage");
  const router = useRouter();

  useEffect(() => {
    // console.log("TestPage's useEffect ");
  }, []);
  return (
    <div className="text-white mt-20">
      Deal Page
      {/* <Link href="/cool" shallow>Go Cool Page</Link> */}
      {/* <a href="/cool">Go Cool Page</a> */}
      <div
        onClick={() => {
          router.push("/customers");
        }}
      >
        Go Customer
      </div>
    </div>
  );
};

export default DealsPage;
