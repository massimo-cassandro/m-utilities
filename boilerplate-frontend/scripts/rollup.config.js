import { terser } from 'rollup-plugin-terser';
import sourcemaps from 'rollup-plugin-sourcemaps';
import node_resolve from '@rollup/plugin-node-resolve';
// import fs from 'fs'; // per config dinamico
// import commonjs from '@rollup/plugin-commonjs'; // per importazione file umd
// import filesize from 'rollup-plugin-filesize';
//import injectProcessEnv from 'rollup-plugin-inject-process-env'; // dove necessario (popper.js)

// import minifyHTML from 'rollup-plugin-minify-html-literals';


const terserOptions = {
  compress: {
    passes: 2
  }
};

export default [
  {
    input: 'js/javascript-sandbox.js',
    plugins: [
      sourcemaps(),
      node_resolve(),
      terser(terserOptions)
      // minifyHTML(),
      // commonjs(),
      // filesize(),
      // injectProcessEnv({
      //   NODE_ENV: 'production'
      // })
    ],
    output: [
      {
        file: 'js/javascript-sandbox.min.js',
        format: 'iife',
        sourcemap: true
      }
    ]
  },
  {
    input: 'js/prism.js',
    plugins: [sourcemaps(), resolve(), terser(terserOptions) /*, minifyHTML(),  */],
    output: [
      {
        file: 'js/prism.min.js',
        format: 'iife',
        name: 'Prism',
        sourcemap: false
      }
    ]
  }
];
