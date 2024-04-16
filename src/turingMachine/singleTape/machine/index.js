/**
 * @typedef {import('../singleTM').SingleTapeTuringMachine} SingleTapeTuringMachine
 */
/**
 * Creates a single tape Turing Machine
 *
 * @param {Object} [options={}] The options for the Turing Machine
 * @param {string} [options.input=''] The input for the Turing Machine
 * @param {string} [options.startingState='q0'] The starting state of the Turing Machine
 * @param {number} [options.startingTapeHead=0] The starting position of the tape head
 * @param {StateTransitions} [options.transitions={}] The transitions for the Turing Machine
 * @param {Array<string>} [options.startingTape=[]] The starting tape of the Turing Machine
 * @returns {SingleTapeTuringMachine} A single tape Turing Machine
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
