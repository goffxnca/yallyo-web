const friendlyDate = (isoDate: string) => {
  const dateObject = new Date(isoDate);
  const options = { month: "long", day: "numeric", year: "numeric" };

  const formattedDate = dateObject.toLocaleDateString("en-US", options as any);
  return formattedDate;
};

function isSameDate(iosDate1: string, isoDate2: string) {
  const date1 = new Date(iosDate1);
  const date2 = new Date(isoDate2);

  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

function formatDateTo12Hour(date: Date) {
  const formattedDate = date.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
  return formattedDate;
}

export { friendlyDate, isSameDate, formatDateTo12Hour };
