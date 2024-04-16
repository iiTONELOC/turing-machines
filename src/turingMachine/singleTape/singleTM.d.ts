/**
 * Represents the transitions for a specific state.
 */
export type Transition = {
  /**
   * The symbol to write on the tape.
   *
   * This must be included in Γ, the tape alphabet.
   */
  write: any;
  /**
   * The direction to move the tape head.
   *
   * 'R' for right, 'L' for left, and null for no movement.
   */
  move: 'R' | 'L' | null; // The direction to move the tape head.

  /**
   * The next state to transition to.
   *
   * This is an arbitrary state label that can be any string.
   */
  nextState: string; // The next state to transition to.
};

/**
 * Represents transitions for all input symbols in a specific state.
 */
export type StateTransitions = {
  [inputSymbol: string]: Transition;
};

/**
 * Represents the history of the Turing Machine.
 */
export type MachineHistory = {
  tapeHistory: string[]; // The history of the tape of the Turing Machine.
  stateHistory: string[][]; // The history of the state transitions of the Turing Machine.
  tapeHeadHistory: number[]; // The history of the tape head positions of the Turing Machine.
};

/**
 * Represents a Single Tape Turing Machine.
 */
export type SingleTapeTuringMachine = {
  state?: string; // The state of the Turing Machine, defaults to 'q0'.
  input?: string; // The input of the Turing Machine, defaults to an empty string.
  tapeHead?: number; // The position of the tape head on the tape, defaults to 0.
  startState?: string; // The initial state of the Turing Machine, defaults to 'q0'.
  tape?: string[]; // The tape of the Turing Machine, defaults to an empty array.
  stateTransitions?: StateTransitions; // The transitions for the Turing Machine, defaults to an empty object.
  history?: MachineHistory; // The history of the Turing Machine.
};
