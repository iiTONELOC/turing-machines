import assert from 'node:assert';
import {describe, it} from 'node:test';
import {flipTheBitsTransitions } from './index.js';
import {runSingleTapeTM} from '../../runner/index.js';
import {singleTapeTuringMachine} from '../../machine/index.js';


describe('Flip the Bits', () => {
  it('should run the Turing Machine until it reaches a final state', () => {
    // turing machine to flip the bits

    const machine = singleTapeTuringMachine({
      input: '1011',
      transitions: flipTheBitsTransitions,
      startingState: 'q0'
    });

    const finalMachine = runSingleTapeTM(machine);
   
    assert.strictEqual(finalMachine.state, 'accept');
    assert.deepStrictEqual(finalMachine.tape, ['0', '1', '0', '0', ' ']);

   
  });

    it('should run the Turing Machine until it reaches a reject state', () => {
      
      const machine = singleTapeTuringMachine({
        input: '10p1',
        transitions: flipTheBitsTransitions,
        startingState: 'q0'
      });

      const finalMachine = runSingleTapeTM(machine);

      assert.strictEqual(finalMachine.state, 'reject');
      assert.deepStrictEqual(finalMachine.tape, ['0', '1', 'p', '1', ' ']);
    });
});
