const convertFullnameToAbbr = (fullname: string) => {
  const nameParts = fullname.split(" ");
  const [firstname, lastname] = nameParts;
  const nameAbbr = lastname
    ? `${firstname[0]}${lastname[0]}`.toUpperCase()
    : firstname[0].toUpperCase();
  return nameAbbr;
};

const generateRandomAlphaNumeric = (length: number) => {
  const characters =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }

  return result;
};

export { convertFullnameToAbbr, generateRandomAlphaNumeric };
