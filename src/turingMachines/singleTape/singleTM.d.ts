import {singleTapeTuringMachine} from './machine';

/**
 * Represents the transitions for a specific state.
 */
export type Transition = {
  /**
   * The symbol to write on the tape.
   *
   * This must be included in Γ, the tape alphabet.
   */
  write: string;
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
  [machineState: string]: {
    [tapeSymbol: string]: Transition; // The transitions for the state and tape symbol.
  };
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
 * Represents the graph of a Turing Machine.
 */
export type MachineGraphs = {
  [machineName: string]: {
    transitions: StateTransitions;
    startingState: string;
  };
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
  stateTransitions: StateTransitions; // The transitions for the Turing Machine, defaults to an empty object.
  history?: MachineHistory; // The history of the Turing Machine.
};

export declare function singleTapeTuringMachine({
  input,
  transitions,
  startingTape,
  startingState,
  startingTapeHead
}: {
  input: string;
  transitions: StateTransitions;
  startingTape: string[];
  startingState: string;
  startingTapeHead: number;
}): SingleTapeTuringMachine;

export declare function runSingleTapeTM(machine: SingleTapeTuringMachine): SingleTapeTuringMachine;

export declare function printHistory(forMachine: singleTapeTuringMachine): void;

export type singleTapeTM = {
  machine: singleTapeTuringMachine;
  runner: runSingleTapeTM;
  printHistory: printHistory;
  machineGraphs: MachineGraphs;
};

export declare const singleTM = {
  machine: singleTapeTuringMachine,
  runner: runSingleTapeTM,
  printHistory,
  machineGraphs: MachineGraphs
};
