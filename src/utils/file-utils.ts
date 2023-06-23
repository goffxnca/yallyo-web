import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import Resizer from "react-image-file-resizer";
import { v4 as uuidv4 } from "uuid";

const resizeFile = async (file: any) => {
  return new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      200,
      200,
      "JPEG",
      100,
      0,
      (resizedFile) => {
        resolve(resizedFile);
      },
      "file",
      160,
      160
    );
  });
};

const uploadFileToStorage = async (type: string, file: any) => {
  const storage = getStorage();
  const storageRef = ref(
    storage,
    `${type}/${uuidv4()}${getFileExtension(file.name)}`
  );

  return uploadBytes(storageRef, file).then((snapshot) =>
    getDownloadURL(snapshot.ref).then((downloadUrl) => {
      if (downloadUrl) {
        const tokenIndex = downloadUrl.indexOf("&token");
        //if there's a token segment in image url, drop it
        return tokenIndex === -1
          ? downloadUrl
          : downloadUrl.substring(0, tokenIndex);
      }
    })
  );
};

const getFileExtension = (filename: string) => {
  let fileExtension = "";
  if (typeof filename === "string" && filename.length > 0) {
    const filenameSegments = filename.split(".");
    if (filenameSegments.length > 0) {
      fileExtension = filenameSegments.pop() || "";
    }
  }

  if (fileExtension) {
    fileExtension = fileExtension.toLowerCase();
  }

  return fileExtension ? "." + fileExtension : "";
};

export { resizeFile, uploadFileToStorage };
