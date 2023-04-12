const colors = [
  "#FF5733",
  "#C70039",
  "#00A8CC",
  "#4B0082",
  "#2ECC71",
  "#F39C12",
];

const getRandomColor = () => {
  const randomIndex = Math.floor(Math.random() * colors.length);
  const randomColor = colors[randomIndex];
  return randomColor;
};
export { getRandomColor };
