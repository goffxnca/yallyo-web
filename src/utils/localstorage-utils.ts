//@Note: to create only 3 room per day

const readCurrentCreateRoomQuotaCount = () => {
  const currentRawData = localStorage.getItem(`create-room-quota`);
  const currentJsonData = currentRawData ? JSON.parse(currentRawData) : null;
  const todayDate = new Date().toLocaleDateString();

  if (currentJsonData) {
    const todayObject = currentJsonData.find(
      (obj: any) => obj.date === todayDate
    );
    if (todayObject) {
      return todayObject.count;
    } else {
      return 0;
    }
  } else {
    return 0;
  }
};

const addCreateRoomQuota = () => {
  const currentRawData = localStorage.getItem(`create-room-quota`);
  const currentJsonData = currentRawData ? JSON.parse(currentRawData) : null;

  const todayDate = new Date().toLocaleDateString();
  const defaultData = [
    {
      date: todayDate,
      count: 1,
    },
  ];

  if (currentJsonData) {
    const todayObject = currentJsonData.find(
      (obj: any) => obj.date === todayDate
    );
    if (todayObject) {
      todayObject.count = todayObject.count + 1;
      localStorage.setItem(
        `create-room-quota`,
        JSON.stringify(currentJsonData)
      );
    } else {
      localStorage.setItem(`create-room-quota`, JSON.stringify(defaultData));
    }
  } else {
    localStorage.setItem(`create-room-quota`, JSON.stringify(defaultData));
  }
};

export { readCurrentCreateRoomQuotaCount, addCreateRoomQuota };
