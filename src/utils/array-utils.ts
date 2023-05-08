function getRandomItem<T>(arr: T[]): T {
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
}

const createNArray = (length: number): number[] => {
  return Array.from({ length }, (v, k) => k + 1);
};

const createNArrayFrom = (from: number, length: number): number[] => {
  return Array.from({ length }, (v, k) => k + 3);
};

export { getRandomItem, createNArray, createNArrayFrom };
