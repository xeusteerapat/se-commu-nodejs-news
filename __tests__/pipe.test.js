import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { pipe } from '../kata.js';

describe('pipe', () => {
  it('should return the input value when no functions are provided', () => {
    const identity = pipe();
    assert.strictEqual(identity(42), 42);
  });

  it('should apply functions in the correct order', () => {
    const addTwo = x => x + 2;
    const multiplyByThree = x => x * 3;
    const subtractFive = x => x - 5;

    const combinedFunction = pipe(addTwo, multiplyByThree, subtractFive);
    assert.strictEqual(combinedFunction(10), 31); // ((10 + 2) * 3) - 5 = 21
  });

  it('should work with functions returning different data types', () => {
    const addTwoToString = x => (x + 2).toString();
    const divideByTwo = x => x / 2;

    const combinedFunction = pipe(addTwoToString, divideByTwo);
    assert.strictEqual(combinedFunction(10), 6); // ((10 + 2).toString() / 2) = '6'
  });
});
