/**
 * @typedef {import('./singleTM').SingleTapeTuringMachine} SingleTapeTuringMachine
 * @typedef {import('./singleTM').Transition} Transition
 */

/**
 * Looks for the transition in the stateTransitions object of the Turing Machine based on the current state and input symbol
 * @param {SingleTapeTuringMachine} fromMachine - The Turing Machine to get the transition from
 * @param {string} inputSymbol - The input symbol to look for in the stateTransitions object
 * @returns {Transition|undefined} The transition object for the current state and input symbol or undefined if no transition is found
 */
export function getTransition(fromMachine, inputSymbol) {
  try {
    return fromMachine.stateTransitions[fromMachine.state][inputSymbol];
  } catch (error) {
    return undefined;
  }
}

/**
 * Moves the tape head based on the direction in the transition object
 *
 * Does not enforce any bounds.
 * This function assumes that the tape head can move to any position and that the state transitions are valid.
 *
 * @param {SingleTapeTuringMachine} machine - The Turing Machine to move the tape head for
 * @param {Transition} transition - The transition object to get the direction from
 * @returns {SingleTapeTuringMachine} The Turing Machine with the tape head moved
 */
export function moveTapeHead(machine, transition) {
  const tapeHead =
    machine.tapeHead + (transition.move === 'R' ? 1 : transition.move === 'L' ? -1 : 0); // NOSONAR

  return {
    ...machine,
    tapeHead
  };
}

/**
 * Writes the symbol to the tape based on the transition object
 *
 * @param {SingleTapeTuringMachine} machine - The Turing Machine to write the symbol to
 * @param {Transition} transition - The transition object to get the symbol from
 * @returns {SingleTapeTuringMachine} The Turing Machine with the symbol written to the tape
 */
export function writeSymbol(machine, transition) {
  const tape = [...machine.tape];
  // only write if the transition has a write property and it is not null
  if (transition.write !== null && transition.write !== undefined)
    tape[machine.tapeHead] = transition.write;

  return {
    ...machine,
    tape
  };
}

/**
 * Retrieves the current symbol from the tape
 *
 * @param {SingleTapeTuringMachine} machine - The Turing Machine to get the current symbol from
 * @returns {string} The current symbol from the tape, if the tape head is out of bounds, returns a blank space
 */
export function getCurrentSymbol(machine) {
  return machine.tape[machine.tapeHead] || ' ';
}

/**
 * Updates the state of the Turing Machine based on the transition object
 *
 * If no transition object is provided, the state is set to 'reject'
 * @param {SingleTapeTuringMachine} machine - The Turing Machine to update the state for
 * @param {Transition|undefined} transition - The transition object to get the next state from
 * @returns {SingleTapeTuringMachine} The Turing Machine with the updated state
 */
export function updateState(machine, transition) {
  return {
    ...machine,
    state: transition?.nextState || 'reject'
  };
}

/**
 * Runs the single tape Turing Machine
 *
 * @param {SingleTapeTuringMachine} machine - The Turing Machine to run
 * @returns {SingleTapeTuringMachine}
 */
export function runSingleTapeTM(machine) {
  let currentMachine = {...machine};

  while (
    currentMachine?.state?.toLocaleLowerCase() !== 'reject' ||
    currentMachine?.state.toLocaleLowerCase() !== 'accept'
  ) {
    // look for the current symbol in the tape, if the symbol is not found, return a blank space
    let currentSymbol = getCurrentSymbol(currentMachine);

    // update the tape head position in the history
    currentMachine.history.tapeHeadHistory.push(currentMachine.tapeHead);

    // look for the transition in the stateTransitions object
    const nextTransition = getTransition(currentMachine, currentSymbol);
    const {write, move, nextState} = nextTransition || {};

    // update the state in the history
    currentMachine.history.stateHistory.push([
      currentMachine.state,
      currentSymbol,
      write,
      move,
      nextState || 'reject'
    ]);
    // update the tape in the history
    currentMachine.history.tapeHistory.push([...currentMachine.tape]);
    // update the state
    currentMachine = updateState(currentMachine, nextTransition);

    // break out if the nextState is undefined or null or 'reject'
    if (!nextState || nextState === 'reject' || nextState === 'accept') {
      break;
    }

    // write the symbol to the tape
    currentMachine = writeSymbol(currentMachine, {write, move});

    // move the tape head
    currentMachine = moveTapeHead(currentMachine, {move});

    currentMachine.state = nextState || 'reject';
  }

  return currentMachine;
}

export function printHistory(machine) {
  machine.history.stateHistory.forEach((state, index) => {
    const upArrow = '↑';

    console.log(`\nState Step ${index + 1}:`);
    console.log(`  State: ${state[0]}`);
    console.log(`\tTape     : ${machine.history.tapeHistory[index]?.join('') || ''}`);
    console.log(
      `\tTape Head: ${upArrow.padStart(machine.history.tapeHeadHistory[index] + 1, ' ')}`
    );
    console.log(`\n\tInput Symbol: ${state[1]}`);
    console.log(`\tWrite Symbol: ${state[2]}`);
    console.log(`\tMove Tape Head: ${state[3]}`);
    console.log(`\tNext State: ${state[4]}`);
  });
}
