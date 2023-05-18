import * as functions from "firebase-functions";
import { UserRecord } from "firebase-admin/auth";
// import axios from "axios";
import fetch from "cross-fetch";

// // Start writing functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const REGION = "asia-southeast1";

const onUserCreated = functions
  .region(REGION)
  .auth.user()
  .onCreate(async (user: UserRecord) => {
    functions.logger.info("Create user triggered", { data: user });
    try {
      const { uid, email, displayName, photoURL, providerData } = user;
      const response = await fetch("https://agentsistant.com/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.GCF_API_KEY!,
        },
        body: JSON.stringify({
          _id: uid,
          email,
          displayName,
          photoURL,
          provider: providerData[0]?.providerId || "",
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      functions.logger.info("Create user successfully", { data });
    } catch (error) {
      functions.logger.error("Create user failed: ", error);
    }
  });

export { onUserCreated };
