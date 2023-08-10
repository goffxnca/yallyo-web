import { AppDispatch } from "@/store/store";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { auth } from "../../../firebase";
import { IFirebaseUser } from "@/types/frontend";
import { assignSuccessAuth, assignErrorAuth } from "@/store/authSlice";
import React from "react";
import DarkOverlay from "./Overlay";

const Auth = React.memo(() => {
  const dispatch: AppDispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  // console.log("Auth");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("@@@@onAuthStateChanged", user);

      if (user && user.displayName && user.photoURL) {
        const authData: IFirebaseUser = {
          uid: user.uid,
          email: user.email!,
          displayName: user.displayName!,
          photoURL: user.photoURL!,
          idToken: (user as any).accessToken,
          type1: "",
        };

        user.getIdTokenResult().then((result) => {
          authData.type1 = result.claims?.type1 || "";
          dispatch(assignSuccessAuth(authData));
          (window as any)["screenOptions"] = authData;
        });
      } else {
        dispatch(assignErrorAuth());
      }
      setLoading(false);
    });

    //normal useEffect cleanup function doesn't works here, so resort to DOM api
    window.addEventListener("beforeunload", () => {
      unsubscribe();
    });
  }, []);

  return <>{loading && <DarkOverlay />}</>;
});

Auth.displayName = "Auth";

export default Auth;
