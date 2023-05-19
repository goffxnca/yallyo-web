import { AppDispatch } from "@/store/store";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { auth } from "../../../firebase";
import { FirebaseUser } from "@/types/frontend";
import { assignAuth, resetAuth } from "@/store/authSlice";
import React from "react";

const Auth = React.memo(() => {
  const dispatch: AppDispatch = useDispatch();
  console.log("Auth");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("@@@@onAuthStateChanged", user);
      if (user) {
        const auth: FirebaseUser = {
          uid: user.uid,
          email: user.email!,
          displayName: user.displayName!,
          photoURL: user.photoURL!,
          idToken: (user as any).accessToken,
        };
        dispatch(assignAuth(auth));
      } else {
        dispatch(resetAuth());
      }
    });

    //normal useEffect cleanup function doesn't works here, so resort to DOM api
    window.addEventListener("beforeunload", () => {
      unsubscribe();
      //   dispatch(
      //     createRoom({
      //       language: "wefwef",
      //       level: "232",
      //       topic: "11",
      //       desc: "efeeff",
      //       size: 4,
      //       order: Math.random(),
      //     })
      //   );
    });
  }, []);

  return null;
});

Auth.displayName = "Auth";

export default Auth;
