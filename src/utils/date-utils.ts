const friendlyDate = (isoDate: string) => {
  const dateObject = new Date(isoDate);
  const options = { month: "long", day: "numeric", year: "numeric" };

  const formattedDate = dateObject.toLocaleDateString("en-US", options as any);
  console.log(formattedDate); // Output: "July 22, 2023"
  return formattedDate;
};

function isSameDate(iosDate1: string, isoDate2: string) {
  const date1 = new Date(iosDate1);
  const date2 = new Date(isoDate2);

  return (
    date1.getUTCFullYear() === date2.getUTCFullYear() &&
    date1.getUTCMonth() === date2.getUTCMonth() &&
    date1.getUTCDate() === date2.getUTCDate()
  );
}

export { friendlyDate, isSameDate };
