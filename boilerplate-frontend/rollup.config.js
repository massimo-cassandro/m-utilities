import { terser } from 'rollup-plugin-terser';
import sourcemaps from 'rollup-plugin-sourcemaps';
import resolve from '@rollup/plugin-node-resolve';
// import minifyHTML from 'rollup-plugin-minify-html-literals';
// import commonjs from '@rollup/plugin-commonjs';
// import filesize from 'rollup-plugin-filesize';

const terserOptions = {
  compress: {
    passes: 2
  }
};

export default [
  {
    input: 'js/javascript-sandbox.js',
    plugins: [/* filesize(),  */sourcemaps(), resolve()/* , commonjs() */],
    output: [
      {
        file: 'js/javascript-sandbox.min.js',
        format: 'iife',
        sourcemap: true,
        plugins: [/* minifyHTML(),  */terser(terserOptions)]
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
        plugins: [/* minifyHTML(),  */terser(terserOptions)]
      }
    ]
  }
];
