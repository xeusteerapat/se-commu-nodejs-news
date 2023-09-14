const arr = ['a', 'b', 'c', 'd', 'e'];

const result1 = arr.at(0); // 'a'
const result2 = arr.at(-1); // 'e'
const result3 = arr.at(100); // undefined
const result4 = arr.at();

console.log({
  result1,
  result2,
  result3,
  result4,
});
