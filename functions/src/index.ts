// // import * as functions from "firebase-functions";

// // // Start writing functions
// // // https://firebase.google.com/docs/functions/typescript
// //

// // export const helloWorld = functions.https.onRequest((request, response) => {
// //   functions.logger.info("Hello logs!", { structuredData: true });
// //   response.send("Hello from Firebase!");
// // });

// import * as functions from "firebase-functions";
// import * as admin from "firebase-admin";

// admin.initializeApp();

// const REGION = "asia-southeast1";

// const onRoomsChange3 = functions
//   .region(REGION)
//   .firestore.document("rooms/{roomId}")
//   .onWrite(async (change, context) => {
//     functions.logger.info("Rooms Data Changed", {
//       data: {
//         action: context.eventType,
//         before: change.before.data(),
//         after: change.after.data(),
//       },
//     });

//     const rooms = await admin.firestore().collection("rooms").get();
//     let data: any[] = [];
//     rooms.forEach((doc) => {
//       data.push(doc.data());
//     });

//     await admin.firestore().collection("roomsZip").doc().set({ zip: data });
//     // Handle the change here
//   });

// export { onRoomsChange3 };
