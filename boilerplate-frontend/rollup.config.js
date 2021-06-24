import { terser } from 'rollup-plugin-terser';
import sourcemaps from 'rollup-plugin-sourcemaps';
import resolve from '@rollup/plugin-node-resolve';
// import commonjs from '@rollup/plugin-commonjs';

const terserOptions = {
  compress: {
    passes: 2
  }
};

export default [
  {
    input: 'js/javascript-sandbox.js',
    plugins: [sourcemaps(), resolve()/* , commonjs() */],
    output: [
      {
        file: 'js/javascript-sandbox.min.js',
        format: 'iife',
        sourcemap: true,
        plugins: [terser(terserOptions)]
      }
    ]
  },
  {
    input: 'js/prism.js',
    plugins: [sourcemaps(), resolve()],
    output: [
      {
        file: 'js/prism.min.js',
        format: 'iife',
        name: 'Prism',
        sourcemap: false,
        plugins: [terser(terserOptions)]
      }
    ]
  }
];
