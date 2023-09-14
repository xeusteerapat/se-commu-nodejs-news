import { test, mock } from 'node:test';
import assert from 'node:assert';
import fs from 'node:fs';

mock.method(fs, 'readFile', async () => 'Hello World');

test('synchronous passing test', async t => {
  // This test passes because it does not throw an exception.
  const fileContent = await fs.readFile('a.txt');
  assert.strictEqual(fileContent, 'Hello World');
});
