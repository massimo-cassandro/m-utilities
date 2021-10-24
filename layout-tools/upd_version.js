/* eslint-env node */
/*
  https://stackoverflow.com/questions/48609931/how-can-i-reference-package-version-in-npm-script/48619640
*/

const fs = require('fs');
// path = require('path'),
// glob = require('glob');

// grabbing of woff2, css and svg file in static dir
// NB: .woff fonts are not preloaded
const target_file = './js/layout-tools.js',
  VERSION = process.env.npm_package_version;
let target_content = fs.readFileSync(target_file).toString();

target_content = target_content
  .replace(/const _VERSION = '.+';/, `const _VERSION = '${VERSION}';`);

// console.log( target_content); // eslint-disable-line

fs.writeFileSync(target_file, target_content);

console.log('*** upd_version.js end  ***'); // eslint-disable-line
