export const getRandomNumberLength = (len = 16) => {
  return Math.floor(
    Math.pow(10, len - 1) + Math.random() * 9 * Math.pow(10, len - 1)
  );
};

export const getRandomNumberMinMax = (min = 0, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};
