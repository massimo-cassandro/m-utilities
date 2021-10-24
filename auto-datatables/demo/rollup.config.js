import { terser } from 'rollup-plugin-terser';
// import sourcemaps from 'rollup-plugin-sourcemaps';
import node_resolve from '@rollup/plugin-node-resolve';
// import fs from 'fs'; // per config dinamico
import commonjs from '@rollup/plugin-commonjs'; // per importazione file umd
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
    input: './bs5/autoDataTable-demo.js',
    plugins: [
      node_resolve(),
      commonjs(),
    ],
    output: [
      {
        file: './bs5/autoDataTable-demo-min.js',
        format: 'iife',
        sourcemap: false,
        plugins: [terser(terserOptions)]
      }
    ]
  },
  {
    input: './bs5/creaDataTable-demo.js',
    plugins: [
      node_resolve(),
      commonjs(),
    ],
    output: [
      {
        file: './bs5/creaDataTable-demo-min.js',
        format: 'iife',
        sourcemap: false,
        plugins: [terser(terserOptions)]
      }
    ]
  },
  {
    input: './bs4/autoDataTable-demo.js',
    plugins: [
      node_resolve(),
      commonjs(),
    ],
    output: [
      {
        file: './bs4/autoDataTable-demo-min.js',
        format: 'iife',
        sourcemap: false,
        plugins: [terser(terserOptions)]
      }
    ]
  },
  {
    input: './bs4/creaDataTable-demo.js',
    plugins: [
      node_resolve(),
      commonjs(),
    ],
    output: [
      {
        file: './bs4/creaDataTable-demo-min.js',
        format: 'iife',
        sourcemap: false,
        plugins: [terser(terserOptions)]
      }
    ]
  }

];
