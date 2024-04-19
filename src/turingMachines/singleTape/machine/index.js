/**
 * @typedef {import('./singleTM').SingleTapeTuringMachine} SingleTapeTuringMachine
 * @typedef {import('./singleTM').singleTapeTuringMachine} singleTapeTuringMachine
 * @typedef {import('./singleTM').StateTransitions} StateTransitions
 */
/**
 * Creates a single tape Turing Machine
 * @type {singleTapeTuringMachine}
 */
export function singleTapeTuringMachine({
  input = '',
  transitions = {},
  startingTape = [],
  startingState = 'q0',
  startingTapeHead = 0
} = {}) {
  const state = startingState;
  const tapeHead = startingTapeHead;

  function mergeInputWithTape() {
    const tape = [...startingTape];
    const inputArray = input.split('');

    if (tape.length > 0 && inputArray.length > 0) {
      tape.push(' ');
    }

    // if the input is not empty, add it to the tape
    if (inputArray.length > 0) {
      tape.push(...inputArray);
      tape.push(' ');
    }

    return tape;
  }

  return {
    state,
    input,
    tapeHead,
    startState: state,
    tape: mergeInputWithTape(),
    stateTransitions: transitions,
    history: {
      stateHistory: [],
      tapeHistory: [],
      tapeHeadHistory: []
    }
  };
}
