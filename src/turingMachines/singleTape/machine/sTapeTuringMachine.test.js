import assert from 'node:assert';
import {describe, it} from 'node:test';
import {singleTapeTuringMachine} from './index.js';

describe('Single Tape Turing Machine', () => {
  it('should be a function', () => {
    assert.strictEqual(typeof singleTapeTuringMachine, 'function');
  });

  it('should return an object', () => {
    assert.strictEqual(typeof singleTapeTuringMachine(), 'object');
  });

  it('should have a "tape" property', () => {
    assert.strictEqual(singleTapeTuringMachine().hasOwnProperty('tape'), true);
  });

  it('should have an empty "tape" array', () => {
    assert.deepStrictEqual(singleTapeTuringMachine().tape, []);
  });

  it('should have a "tape" property that can be set to a different value', () => {
    assert.deepStrictEqual(singleTapeTuringMachine({startingTape: ['1']}).tape, ['1']);
  });

  it('should have a "tape" property that adjusts itself based on the input', () => {
    assert.deepStrictEqual(singleTapeTuringMachine({input: '1011'}).tape, ['1', '0', '1', '1', ' ']);
  });

  it('should have a "state" property', () => {
    assert.strictEqual(singleTapeTuringMachine().hasOwnProperty('state'), true);
  });

  it('should have a "state" property with an initial value of "q0"', () => {
    assert.strictEqual(singleTapeTuringMachine().state, 'q0');
  });

  it('should have a "startState" property with an initial value of "q0"', () => {
    assert.strictEqual(singleTapeTuringMachine().startState, 'q0');
  });

  it('should have a "startState" property that can be set to a different value', () => {
    assert.strictEqual(singleTapeTuringMachine({startingState: 'q1'}).startState, 'q1');
  });

  it('should have a "tapeHead" property', () => {
    assert.strictEqual(singleTapeTuringMachine().hasOwnProperty('tapeHead'), true);
  });

  it('should have a "tapeHead" property with an initial value of 0', () => {
    assert.strictEqual(singleTapeTuringMachine().tapeHead, 0);
  });

  it('should have a "tapeHead" property that can be set to a different value', () => {
    assert.strictEqual(singleTapeTuringMachine({startingTapeHead: 1}).tapeHead, 1);
  });

  it('should have a "stateTransitions" property', () => {
    assert.strictEqual(singleTapeTuringMachine().hasOwnProperty('stateTransitions'), true);
  });

  it('should have a stateTransitions property that accepts a StateTransition object', () => {
    assert.strictEqual(singleTapeTuringMachine().hasOwnProperty('stateTransitions'), true);
  });

  it('should have a stateTransitions property that accepts a StateTransition object', () => {
    const stateTransitions = {
      q0: {
        0: {
          write: '1',
          move: 'R',
          next: 'q1'
        }
      }
    };
    assert.deepStrictEqual(
      singleTapeTuringMachine({transitions: stateTransitions}).stateTransitions,
      stateTransitions
    );
  });

  it('should have an "input" property', () => {
    assert.strictEqual(singleTapeTuringMachine().hasOwnProperty('input'), true);
  });

  it('should have an "input" property with an initial value of an empty string', () => {
    assert.strictEqual(singleTapeTuringMachine().input, '');
  });

  it('should have an "input" property that can be set to a different value', () => {
    assert.strictEqual(singleTapeTuringMachine({input: '1'}).input, '1');
  });

  it('should have an "input" property that correctly places the input at the end of a tape', () => {
    const input = '1110111';
    const singleMachine = singleTapeTuringMachine({startingTape: ['0', '1', '0'], input});

    assert.deepStrictEqual(singleMachine.tape, [
      '0',
      '1',
      '0',
      ' ',
      '1',
      '1',
      '1',
      '0',
      '1',
      '1',
      '1',
      ' '
    ]);
  });

  it('should have a "history" property', () => {
    assert.strictEqual(singleTapeTuringMachine().hasOwnProperty('history'), true);
  });

  it('should have a "history" property with a "stateHistory" property', () => {
    assert.strictEqual(singleTapeTuringMachine().history.hasOwnProperty('stateHistory'), true);
  });

  it('should have a "history" property with a "tapeHistory" property', () => {
    assert.strictEqual(singleTapeTuringMachine().history.hasOwnProperty('tapeHistory'), true);
  });

  it('should have a "history" property with a "tapeHeadHistory" property', () => {
    assert.strictEqual(singleTapeTuringMachine().history.hasOwnProperty('tapeHeadHistory'), true);
  });

  it('should have a "history" property with a "stateHistory" array that contains the initial state', () => {
    assert.deepStrictEqual(singleTapeTuringMachine().history.stateHistory, []);
  });

  it('should have a "history" property with an empty "tapeHistory" array', () => {
    assert.deepStrictEqual(singleTapeTuringMachine().history.tapeHistory, []);
  });

  it('should have a "history" property with an empty "tapeHeadHistory" array', () => {
    assert.deepStrictEqual(singleTapeTuringMachine().history.tapeHeadHistory, []);
  });
});
