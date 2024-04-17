import process from 'process';
import {singleTapeTM} from './src/turingMachine/singleTape/index.js';

if (process?.argv[1]?.includes('index.js')) {
  const [, , input, graph, ...flags] = process.argv;

  function printUsage() {
    console.log('Usage: node index.js <input> <graph> [flags]');
    console.log('Or');
    console.log('Usage: npm run start <input> <graph>  [--] [flags]\n');
    console.log('Input: The input string to run on the machine');
    console.log('Graphs:');
    console.log('\tcopyAndPaste: Copy and paste the input');
    console.log('\tflipTheBits: Flip the bits of the input');
    console.log('Flags:');
    console.log('\t--history: Print the history of the machine');
  }

  // get the graph to use
  const graphToUse = singleTapeTM.machineGraphs[graph] || null;

  if (input) {
    if (!graphToUse) {
      console.error(`Graph ${graph} not found!`);
      printUsage();
      process.exit(1);
    }

    const result = singleTapeTM.runner(
      singleTapeTM.machine({
        input,
        transitions: graphToUse.transitions,
        startingState: graphToUse.startState
      })
    );

    console.log('Input :', input);
    console.log('Result:', result.tape.join(''));
    console.log('Steps :', result.history.stateHistory.length.toString());

    // check the flags
    if (flags.includes('--history')) {
      console.log('\nHistory:');
      singleTapeTM.printHistory(result);
    }
  } else {
    console.error('No input provided!\n');
    printUsage();
    process.exit(1);
  }
}
