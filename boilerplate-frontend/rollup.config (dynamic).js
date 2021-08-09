import { terser } from 'rollup-plugin-terser';
import sourcemaps from 'rollup-plugin-sourcemaps';
import fs from 'fs';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
// import minifyHTML from 'rollup-plugin-minify-html-literals';
// import filesize from 'rollup-plugin-filesize';

const terserOptions = {
    compress: {
      passes: 2
    }
  },
  js_dirs = [
    'js/public/',
    'js/backoffice/'
  ];

let config = [];

js_dirs.forEach(dir => {

  // https://stackoverflow.com/questions/2727167/how-do-you-get-a-list-of-the-names-of-all-files-present-in-a-directory-in-node-j
  fs.readdirSync(dir).filter(f => /\.js$/.test(f)).forEach(file => {

    config.push(
      {
        // preserveEntrySignatures: false,
        input: `${dir}${file}`,
        plugins: [/* filesize(),  */sourcemaps(), resolve(), commonjs()],
        output: [{
          file: `${dir}dist/${file.replace('.js', '-min.js')}`,
          format: 'iife',
          sourcemap: true,
          plugins: [/* minifyHTML(),  */terser(terserOptions)]
        }]
      }
    );

  });
});

export default config;
