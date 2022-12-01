export const getRandomNumberLength = (len = 16) => {
  return Math.floor(
    Math.pow(10, len - 1) + Math.random() * 9 * Math.pow(10, len - 1)
  );
};
