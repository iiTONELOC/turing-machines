import assert from 'node:assert';
import {describe, it} from 'node:test';
import {singleTapeTuringMachine} from './index.js';
import {
  getTransition,
  moveTapeHead,
  writeSymbol,
  getCurrentSymbol,
  updateState,
  runSingleTapeTM,
} from './runSingleTapeTM.js';

describe('get transition', () => {
  const machine = singleTapeTuringMachine({
    transitions: {
      q0: {
        0: {
          write: '0',
          move: 'R',
          nextState: 'q1'
        }
      },
      q1: {
        0: {
          write: '0',
          move: 'R',
          nextState: 'q1'
        }
      }
    }
  });

  it('should return the transition object for the current state and input symbol', () => {
    const inputSymbol = '0';
    const transition = getTransition(machine, inputSymbol);

    assert.deepStrictEqual(transition, {
      write: '0',
      move: 'R',
      nextState: 'q1'
    });
  });

  it('should return undefined if no transition is found', () => {
    const inputSymbol = '1';
    const transition = getTransition(machine, inputSymbol);

    assert.strictEqual(transition, undefined);
  });
});

describe('move tape head', () => {
  it('should move the tape head to the right', () => {
    const machine = singleTapeTuringMachine();
    const transition = {
      write: '0',
      move: 'R',
      nextState: 'q1'
    };
    const newMachine = moveTapeHead(machine, transition);

    assert.strictEqual(newMachine.tapeHead, 1);
  });

  it('should move the tape head to the left', () => {
    const machine = singleTapeTuringMachine({
      startingTape: ['1', '0'],
      startingTapeHead: 1
    });
    const transition = {
      write: '0',
      move: 'L',
      nextState: 'q1'
    };
    const newMachine = moveTapeHead(machine, transition);

    assert.strictEqual(newMachine.tapeHead, 0);
  });
});

describe('write symbol', () => {
  it('should write the symbol to the tape', () => {
    const machine = singleTapeTuringMachine();
    const transition = {
      write: '0',
      move: 'R',
      nextState: 'q1'
    };
    const newMachine = writeSymbol(machine, transition);

    assert.deepStrictEqual(newMachine.tape, ['0']);
  });

  it('should not write the symbol to the tape if the write property is null or undefined', () => {
    const machine = singleTapeTuringMachine();
    const transition = {
      move: 'R',
      nextState: 'q1'
    };
    const newMachine = writeSymbol(machine, transition);

    assert.deepStrictEqual(newMachine.tape, []);
  });
});

describe('get current symbol', () => {
  it('should return the current symbol from the tape', () => {
    const machine = singleTapeTuringMachine({
      startingTape: ['0']
    });
    const symbol = getCurrentSymbol(machine);

    assert.strictEqual(symbol, '0');
  });

  it('should return a blank space if the tape head is out of bounds', () => {
    const machine = singleTapeTuringMachine({
      startingTape: ['0'],
      startingTapeHead: 1
    });
    const symbol = getCurrentSymbol(machine);

    assert.strictEqual(symbol, ' ');
  });
});

describe('update state', () => {
  it('should update the state of the Turing Machine', () => {
    const machine = singleTapeTuringMachine({
      transitions: {
        q0: {
          0: {
            write: '0',
            move: 'R',
            nextState: 'q1'
          }
        },
        q1: {
          0: {
            write: '0',
            move: 'R',
            nextState: 'q1'
          }
        }
      }
    });
    const transition = getTransition(machine, '0');
    const newMachine = updateState(machine, transition);
    // make sure it moved into the next state
    assert.strictEqual(newMachine.state, 'q1');
  });

  it('should set the state to "reject" if no transition is provided', () => {
    const machine = singleTapeTuringMachine();
    const newMachine = updateState(machine);

    assert.strictEqual(newMachine.state, 'reject');
  });

  it('should set the state to "reject" if the transition object does not have a next state', () => {
    const machine = singleTapeTuringMachine({
      transitions: {
        q0: {
          0: {
            write: '0',
            move: 'R'
          }
        }
      }
    });
    const transition = getTransition(machine, '0');
    const newMachine = updateState(machine, transition);

    assert.strictEqual(newMachine.state, 'reject');
  });

  it('should set the state to "reject" if the requested transition does not exist', () => {
    const machine = singleTapeTuringMachine({
      transitions: {
        q0: {
          0: {
            write: '0',
            move: 'R',
            nextState: 'q1'
          }
        }
      }
    });
    const transition = getTransition(machine, '1');
    const newMachine = updateState(machine, transition);

    assert.strictEqual(newMachine.state, 'reject');
  });
});

describe('run single tape TM', () => {
  it('should run the Turing Machine until it reaches a final state', () => {
    // turing machine to flip the bits
    const transitions = {
      A: {
        0: {write: '1', move: 'R', nextState: 'A'},
        1: {write: '0', move: 'R', nextState: 'A'},
        ' ': {write: ' ', move: 'L', nextState: 'accept'}
      },
      accept: {}
    };

    const machine = singleTapeTuringMachine({
      input: '1011',
      transitions,
      startingState: 'A'
    });

    const finalMachine = runSingleTapeTM(machine);
   
    assert.strictEqual(finalMachine.state, 'accept');
    assert.deepStrictEqual(finalMachine.tape, ['0', '1', '0', '0', ' ']);

   
  });

    it('should run the Turing Machine until it reaches a reject state', () => {
      // turing machine to flip the bits
      const transitions = {
        A: {
          0: {write: '1', move: 'R', nextState: 'A'},
          1: {write: '0', move: 'R', nextState: 'A'},
          ' ': {write: ' ', move: 'L', nextState: 'accept'}
        }
      };

      const machine = singleTapeTuringMachine({
        input: '10p1',
        transitions,
        startingState: 'A'
      });

      const finalMachine = runSingleTapeTM(machine);

      assert.strictEqual(finalMachine.state, 'reject');
      assert.deepStrictEqual(finalMachine.tape, ['0', '1', 'p', '1', ' ']);
    });
});
