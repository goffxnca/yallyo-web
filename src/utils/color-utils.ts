const colors = [
  "#FF5733",
  "#C70039",
  "#00A8CC",
  "#4B0082",
  "#2ECC71",
  "#F39C12",

  //The below is just random during testing responsiveness of room joiners
  "#1E90FF",
  "#FF1493",
  "#8B4513",
  "#FFD700",
  "#008080",
  "#800000",
  "#808000",
  "#FF00FF",
  "#00FF00",
  "#800080",
  "#FFC0CB",
  "#ADD8E6",
  "#A9A9A9",
];

const getRandomColor = () => {
  const randomIndex = Math.floor(Math.random() * colors.length);
  const randomColor = colors[randomIndex];
  return randomColor;
};
export { getRandomColor };
