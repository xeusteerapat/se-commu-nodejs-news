import _ from 'lodash';

const res = await fetch('https://jsonplaceholder.typicode.com/users/1');
const user = await res.json();

console.log(user);

// Array.prototype.findLast
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const eight = numbers.findLast(n => n % 2 === 0); // 8
const _eight = _.findLast(numbers, n => n % 2 === 0);

// Array.prototype.findLastIndex
const seven = numbers.findLastIndex(n => n % 2 === 0);
const _seven = _.findLastIndex(numbers, n => n % 2 === 0);

console.log({
  eight,
  seven,
});

console.log({
  _eight,
  _seven,
});
