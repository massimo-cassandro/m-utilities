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
    input: './js/layout-tools.js',
    plugins: [sourcemaps(), resolve()/* , commonjs() */],
    output: [
      {
        file: './dist/layout-tools.min.js',
        format: 'iife',
        sourcemap: true,
        plugins: [terser(terserOptions)]
      }
    ]
  }
];
