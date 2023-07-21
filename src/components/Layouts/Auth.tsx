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
      if (user) {
        const auth: IFirebaseUser = {
          uid: user.uid,
          email: user.email!,
          displayName: user.displayName!,
          photoURL: user.photoURL!,
          idToken: (user as any).accessToken,
        };
        dispatch(assignSuccessAuth(auth));
        //Yeah this line is kind of cool right? 😎
        (window as any)["screenOptions"] = auth;
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
