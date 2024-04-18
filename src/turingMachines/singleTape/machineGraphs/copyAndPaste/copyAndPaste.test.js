import assert from 'node:assert';
import {describe, it} from 'node:test';
import {copyAndPaste } from './index.js';
import { runSingleTapeTM} from '../../runner/index.js';
import {singleTapeTuringMachine} from '../../machine/index.js';


describe('Copy and Paste', () => {
  it('should run the Turing Machine until it reaches a final state', () => {
    const machine = singleTapeTuringMachine({
      input: '1011',
      transitions: copyAndPaste,
      startingState: 'A'
    });

    const finalMachine = runSingleTapeTM(machine);

    assert.strictEqual(finalMachine.state, 'accept');
    assert.deepStrictEqual(finalMachine.tape, ['1', '0', '1', '1',' ','1', '0', '1', '1']);
  });

    it('should run the Turing Machine until it reaches a reject state', () => {
      
      const machine = singleTapeTuringMachine({
        input: '10p1',
        transitions: copyAndPaste,
        startingState: 'A'
      });

      const finalMachine = runSingleTapeTM(machine);

      assert.strictEqual(finalMachine.state, 'reject');
      assert.deepStrictEqual(finalMachine.tape, ['x', '0', 'p', '1', ' ']);
    });
});
