import * as readline from 'readline';
import {EventEmitter} from 'node:events';
import {stdin as input, stdout as output} from 'node:process';

/**
 * Prompts the user for input and returns it
 *
 * @param {string|null|undefined} prompt - Optional prompt to display to the user
 * @returns {Promise<string>}
 */
export async function getInput(prompt = 'Enter a string to be processed:') {
  const rl = readline.createInterface({input, output});

  try {
    return new Promise(resolve => {
      rl.question(prompt, answer => {
        resolve(answer.toString());
        rl.close();
      });
    });
  } catch (error) {
    console.error('An error occurred when trying to get input:', error);
  }
}

/**
 * Simulates user input for testing purposes
 *
 * @param {string} mockInput - The mock input to simulate
 * @returns {Promise<string>}
 */
export async function testGetInput(mockInput = 'test') {
  const eventEmitter = new EventEmitter();

  setTimeout(() => {
    eventEmitter.emit('line', mockInput);
  }, 0);

  return new Promise(resolve => {
    eventEmitter.on('line', answer => {
      resolve(answer.toString());
    });
  });
}
