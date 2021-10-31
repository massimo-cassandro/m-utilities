// import { terser } from 'rollup-plugin-terser';
import sourcemaps from 'rollup-plugin-sourcemaps';
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
  },
  files = [
    './bs5/assets/autoDataTable-demo.js',
    './bs5/assets/autoDataTable-jq-ondemand-demo.js',
    './bs5/assets/creaDataTable-demo.js',
    './bs5/assets/creaDataTable-jq-ondemand-demo.js',

    './bs4/assets/autoDataTable-demo.js',
    './bs4/assets/autoDataTable-jq-ondemand-demo.js',
    './bs4/assets/creaDataTable-demo.js',
    './bs4/assets/creaDataTable-jq-ondemand-demo.js'
  ];

let config = [];

files.forEach(file => {

  config.push(
    {
      // preserveEntrySignatures: false,
      input: file,
      plugins: [
        node_resolve(),
        commonjs(),
        // terser(terserOptions),
        sourcemaps()
      ],
      output: [{
        file: file.replace('/assets/', '/dist/').replace('.js', '-min.js'),
        format: 'iife',
        sourcemap: true,
        // plugins: [terser(terserOptions)]
      }]
    }
  );

});

export default config;
