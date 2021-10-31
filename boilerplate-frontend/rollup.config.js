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


// versione dinamica
// ==========================================
// const terserOptions = {
//   compress: {
//     passes: 2
//   }
// },
// dirs = [
//   'public',
//   'backoffice'
// ],
// source_base_dir = './frontend-src/js',
// target_base_dir = './esa-3-sf/public/js';

// let config = [
// {
//   input: `${source_base_dir}/public/flash-messages/flash-messages-umd.js`,
//   plugins: [
//     sourcemaps(),
//     node_resolve(),
//     commonjs(),
//     plugins: [terser(terserOptions)],
//     filesize(),
//     injectProcessEnv({
//       NODE_ENV: 'production'
//     })
//   ],
//   output: {
//     file: `${target_base_dir}/public/flash-messages-min.js`,
//     format: 'umd',
//     sourcemap: true,
//     name: 'mAlert',
//   }
// }
// ];

// dirs.forEach(dir => {

// // https://stackoverflow.com/questions/2727167/how-do-you-get-a-list-of-the-names-of-all-files-present-in-a-directory-in-node-j
// fs.readdirSync(source_base_dir + '/' + dir)
//   .filter(f => /\.js$/.test(f))
//   .filter(f => /^[^_]/.test(f)) // ignore files starting with _
//   .forEach(file => {

//     config.push(
//       {
//         // preserveEntrySignatures: false,
//         input: `${source_base_dir}/${dir}/${file}`,
//         plugins: [
//           sourcemaps(),
//           node_resolve(),
//           commonjs(),
//           plugins: [terser(terserOptions)],
//           filesize(),
//           injectProcessEnv({
//             NODE_ENV: 'production'
//           }),
//         ],
//         output: [{
//           file: `${target_base_dir}/${dir}/${file.replace('.js', '-min.js')}`,
//           format: 'iife',
//           sourcemap: true,
//           name: dir + '_' + file.replace('.js', '').replace(/-/g, '_'), // ?????
//         }]
//       }
//     );

//   });
// });

// export default config;
