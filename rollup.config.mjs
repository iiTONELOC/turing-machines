import pkg from './package.json' assert {type: 'json'};
import commonjs from '@rollup/plugin-commonjs';

export default [
  // browser-friendly UMD build
  {
    input: 'src/index.js',
    output: {
      name: 'turing-machines',
      file: pkg.browser,
      format: 'umd'
    },
    plugins: [commonjs()]
  },
  {
    input: 'src/index.js',
    output: [
      {file: pkg.main, format: 'cjs'},
      {file: pkg.module, format: 'es'}
    ]
  }
];
