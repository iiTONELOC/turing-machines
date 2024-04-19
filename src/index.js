/**
 * @typedef {import('./turingMachines/singleTape/singleTM').SingleTapeTuringMachine} SingleTapeTuringMachine
 * @typedef {import('./turingMachines/singleTape/singleTM').runSingleTapeTM} runSingleTapeTM
 * @typedef {import('./turingMachines/singleTape/singleTM').printHistory} printHistory
 * @typedef {import('./turingMachines/singleTape/singleTM').singleTapeTM} singleTapeTM
 */

import {
  singleTapeTuringMachine,
  runSingleTapeTM,
  printHistory,
  copyAndPaste,
  flipTheBits,
  singleTM
} from './turingMachines/index.js';

export {
  /**@type {singleTapeTuringMachine} */
  singleTapeTuringMachine,
  /**@type {runSingleTapeTM} */
  runSingleTapeTM,
  /**@type {printHistory} */
  printHistory,
  copyAndPaste,
  flipTheBits,
  /**@type {singleTapeTM} */
  singleTM
};
