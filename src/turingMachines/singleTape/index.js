import {singleTapeTuringMachine} from './machine/index.js';
import {runSingleTapeTM, printHistory} from './runner/index.js';
import {copyAndPaste, flipTheBits} from './machineGraphs/index.js';

/**
 * The single tape Turing Machine
 */
export const singleTapeTM = {
  machine: singleTapeTuringMachine,
  runner: runSingleTapeTM,
  printHistory,
  machineGraphs: {
    copyAndPaste: {transitions: copyAndPaste, startState: 'A'},
    flipTheBits: {transitions: flipTheBits, startState: 'q0'}
  }
};

export {singleTapeTuringMachine, runSingleTapeTM, printHistory, copyAndPaste, flipTheBits};

export default singleTapeTM;
