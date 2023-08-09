import * as functions from "firebase-functions";
import { UserRecord } from "firebase-admin/auth";
import { auth } from "firebase-admin";
import { initializeApp } from "firebase-admin/app";
import fetch from "cross-fetch";
import { faker } from "@faker-js/faker";

// // Start writing functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

initializeApp();

const REGION = "asia-southeast1";

const onUserCreated = functions
  .region(REGION)
  .auth.user()
  .onCreate(async (user: UserRecord) => {
    functions.logger.info("Create user triggered", { data: user });
    try {
      const { uid, email, displayName, photoURL, providerData } = user;

      const isTempUser = !displayName && !photoURL;

      const payload = {
        _id: uid,
        email,
        dname: displayName,
        photoURL,
        provider: providerData[0]?.providerId || "",
        type1: isTempUser ? "t" : "p",
      };

      if (isTempUser) {
        payload.dname = faker.internet.userName();
        payload.photoURL = faker.image.avatarGitHub();
      }

      const apiUrl = `${process.env.API_URL}/bo/users`;
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.GCF_API_KEY!,
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      if (isTempUser) {
        await auth().updateUser(uid, {
          displayName: payload.dname,
          photoURL: payload.photoURL,
        });

        await auth().setCustomUserClaims(uid, {
          type1: payload.type1,
        });
      }

      functions.logger.info("Create user successfully", { data });
    } catch (error) {
      functions.logger.error("Create user failed: ", error);
    }
  });

export { onUserCreated };
