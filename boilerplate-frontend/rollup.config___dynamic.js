import { terser } from 'rollup-plugin-terser';
import sourcemaps from 'rollup-plugin-sourcemaps';
import fs from 'fs';
import node_resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
// import minify_html_literals from 'rollup-plugin-minify-html-literals';
// import filesize from 'rollup-plugin-filesize';
// import injectProcessEnv from 'rollup-plugin-inject-process-env';

const terserOptions = {
    compress: {
      passes: 2
    }
  },
  dirs = [
    'public',
    'backoffice'
  ],
  source_base_dir = './frontend-src/js',
  target_base_dir = './esa-3-sf/public/js';

let config = [
  {
    input: `${source_base_dir}/public/flash-messages/flash-messages-umd.js`,
    plugins: [
      sourcemaps(),
      node_resolve(),
      commonjs(),
      // filesize(),
      // injectProcessEnv({
      //   NODE_ENV: 'production'
      // })
    ],
    output: {
      file: `${target_base_dir}/public/flash-messages-min.js`,
      format: 'umd',
      sourcemap: true,
      name: 'mAlert',
      plugins: [terser(terserOptions)]
    }
  }
];

dirs.forEach(dir => {

  // https://stackoverflow.com/questions/2727167/how-do-you-get-a-list-of-the-names-of-all-files-present-in-a-directory-in-node-j
  fs.readdirSync(source_base_dir + '/' + dir)
    .filter(f => /\.js$/.test(f))
    .filter(f => /^[^_]/.test(f)) // ignore files starting with _
    .forEach(file => {

      let format = 'iife',
        name = null;

      if(/(-umd\.js)$/.test(file)) {
        format = 'umd';
        name = file.replace('-umd.js', '').replace(/-/g, '_');
      }

      config.push(
        {
          // preserveEntrySignatures: false,
          input: `${source_base_dir}/${dir}/${file}`,
          plugins: [
            sourcemaps(),
            node_resolve(),
            commonjs(),
            // filesize(),
            // injectProcessEnv({
            //   NODE_ENV: 'production'
            // })
          ],
          output: [{
            file: `${target_base_dir}/${dir}/${file.replace('.js', '-min.js')}`,
            format: format,
            sourcemap: true,
            name: name,
            plugins: [terser(terserOptions)]
          }]
        }
      );

    });
});

export default config;
