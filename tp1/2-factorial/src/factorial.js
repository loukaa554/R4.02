/**
 * Return the factorial of i.
 * @param {number} i - an integer number.
 * @return {number} the factorial of i.
 */
export const factorial = function (i) {
  if (i < 0) {
    throw new Error("An negative number should throw an exception");
  }
  if (i === 0) {
    return 1;
  }
  if (i === 1) {
    return 1;
  }
  return i * factorial(i - 1);
};

export default factorial;
