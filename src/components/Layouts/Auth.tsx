import { AppDispatch } from "@/store/store";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { auth } from "../../../firebase";
import { FirebaseUser } from "@/models/types";
import { assignAuth, resetAuth } from "@/store/authSlice";
import React from "react";

const Auth = React.memo(() => {
  const dispatch: AppDispatch = useDispatch();
  console.log("Auth");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("@@@@onAuthStateChanged");
      if (user) {
        const auth: FirebaseUser = {
          displayName: user.displayName!,
          email: user.email!,
          photoUrl: user.photoURL!,
          firstName: "",
          idToken: "ff",
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
