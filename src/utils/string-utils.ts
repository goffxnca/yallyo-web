const convertFullnameToAbbr = (fullname: string) => {
  const nameParts = fullname.split(" ");
  const [firstname, lastname] = nameParts;
  const nameAbbr = lastname
    ? `${firstname[0]}${lastname[0]}`.toUpperCase()
    : firstname[0].toUpperCase();
  return nameAbbr;
};

export { convertFullnameToAbbr };
