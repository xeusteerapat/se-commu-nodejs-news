/**
  accum("abcd") -> "A-Bb-Ccc-Dddd"
  accum("RqaEzty") -> "R-Qq-Aaa-Eeee-Zzzzz-Tttttt-Yyyyyyy"
  accum("cwAt") -> "C-Ww-Aaa-Tttt"
 * 
 */

/**
 * @param {Function} argsFunc - callback function that apply to x
 */
export const pipe =
  (...argsFunc) =>
  x =>
    argsFunc.reduce((acc, currFunc) => currFunc(acc), x);

/**
 *
 * @param {string} str
 * @returns {string}
 */
export const accum = str => {
  const result = pipe(
    str => str.toLowerCase(),
    str => str.split(''),
    arr => arr.map((item, idx) => ({ char: item, order: idx + 1 })),
    arr => arr.map(item => item.char.repeat(item.order)),
    arr => arr.map(item => item.replace(item[0], item[0].toUpperCase())),
    arr => arr.join('-')
  );

  return result(str);
};
