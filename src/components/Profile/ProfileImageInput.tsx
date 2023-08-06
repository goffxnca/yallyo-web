import { resizeFile } from "@/utils/file-utils";
import { useEffect, useRef, useState } from "react";
const maxfileSizeMB = 10;

interface Props {
  id: string;
  error: string;
  originFileUrl: string;
  register: Function;
  unregister: Function;
  setValue: Function;
}

const ProfileImageInput = ({
  id,
  error,
  originFileUrl = "",
  register,
  unregister,
  setValue,
}: Props) => {
  const fileRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState(null);
  const [fileUrl, setFileUrl] = useState(originFileUrl);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    return () => {
      unregister(id);
    };
  }, []);

  useEffect(() => {
    if (id && fileUrl && file) {
      setValue(
        id,
        {
          fileContent: file,
        },
        { shouldDirty: true }
      );
    }
  }, [fileUrl, file, setValue, id]);

  const resetFile = () => {
    setFile(null);
    setFileUrl(originFileUrl);
  };

  const filesSelectedHandler = (event: any) => {
    setErrorMessage("");
    const file = event.target.files[0];
    if (!file) {
      return;
    }

    const allowedFileTypes = ["image/jpg", "image/jpeg", "image/png"];
    const errorMessages = [];

    //validate file type
    if (!allowedFileTypes.includes(file.type)) {
      errorMessages.push(`Only file type .jpg, .jpeg, .png are allowed.`);
    }

    //validate file size
    const fileSizeMB = file.size / 1024 / 1024;
    if (fileSizeMB > maxfileSizeMB) {
      errorMessages.push("File size must not be over 10 MB.");
    }

    if (errorMessages.length > 0) {
      resetFile();
      setErrorMessage(errorMessages.join());
      return;
    }

    resizeFile(file).then((resizedFile: any) => {
      const fileUrl = URL.createObjectURL(resizedFile);

      if (resizedFile && fileUrl) {
        setFile(resizedFile);
        setFileUrl(fileUrl);

        console.log(
          `resize! from ${(file.size / 1024).toFixed(2)}kb to ${(
            resizedFile.size / 1024
          ).toFixed(2)}kb = new file is now ${(
            file.size / resizedFile.size
          ).toFixed(2)}X smaller than old file`
        );
      }
    });
  };

  return (
    <div className="">
      <input id={id} type="text" name={id} {...register()} hidden />
      <div className="flex items-center space-x-2">
        <img
          src={fileUrl}
          className="w-16 h-16 object-cover rounded-full border-2 border-accent2"
          alt="User Avatar"
        />

        <button
          type="button"
          className="rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-white shadow-sm h-auto"
          onClick={() => {
            if (fileRef && fileRef.current) {
              fileRef.current.click();
            }
          }}
        >
          Change
        </button>

        <input
          type="file"
          accept=".jpg, .jpeg, .png"
          ref={fileRef}
          id="thefile"
          onChange={filesSelectedHandler}
          hidden={true}
        />
      </div>

      <div className="text-red-500 text-xs mt-1">{error || errorMessage}</div>
    </div>
  );
};

export default ProfileImageInput;
