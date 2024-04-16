import assert from 'node:assert';
import {describe, it} from 'node:test';
import {getInput, testGetInput} from './index.js';

describe('getInput', () => {
  it('should be a function', () => {
    assert.strictEqual(typeof getInput, 'function');
  });

  it('should return a string', async () => {
    assert.strictEqual(typeof (await testGetInput()), 'string');
  });

  it('should return the correct string', async () => {
    assert.strictEqual(await testGetInput('this is a test'), 'this is a test');
  });

  it('Should stringify the input', async () => {
    assert.strictEqual(await testGetInput(123), '123');
  });
});
