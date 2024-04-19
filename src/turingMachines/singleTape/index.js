import {singleTapeTuringMachine} from './machine/index.js';
import {runSingleTapeTM, printHistory} from './runner/index.js';
import {copyAndPaste, flipTheBits} from './machineGraphs/index.js';

/**
 * @typedef {import('./singleTM').singleTapeTM} singleTapeTM
 */

/**
 * @type {singleTapeTM}
 */
export const singleTM = {
  machine: singleTapeTuringMachine,
  runner: runSingleTapeTM,
  printHistory: printHistory,
  machineGraphs: {
    copyAndPaste: {transitions: copyAndPaste, startingState: 'A'},
    flipTheBits: {transitions: flipTheBits, startingState: 'q0'}
  }
};

export {singleTapeTuringMachine, runSingleTapeTM, printHistory, copyAndPaste, flipTheBits};

export default singleTM;
