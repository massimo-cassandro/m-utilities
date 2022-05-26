/* eslint-disable no-console */
/* eslint-env node */

/**
 * Generate a scss file to share breakpoints objs
 *
 * (c) Massimo Cassandro 2022
 *
 * node scripts/build-scss-breakpoint.mjs
*/

import fs from 'fs';

import * as brkpts from '../front-end/js/src/breakpoints.mjs';

const dest = './front-end/scss/config/_breakpoints.scss';

let str = '// Questo file è stato generato da `/front-end/scripts/build-scss-breakpoint.mjs`,\n'+
  '// eventuali modifiche apportate manualmente verranno sovrascritte.\n'+
  '// Se fosse necessario editare i breakpoints,\n'+
  '// modificare il file `/front-end/js/src/breakpoints.js`\n'+
  '// e lanciare nuovamente lo script.`.\n\n';

// $grid_breakpoints
let items = [];
for (let i in brkpts.grid_breakpoints) {
  items.push(`  ${i}: ${brkpts.grid_breakpoints[i]}` + (brkpts.container_max_widths[i] > 0? 'px' : ''));
}
str += '$grid-breakpoints: (\n' + items.join(',\n') + '\n);\n\n';

// $container_max_widths
items = [];
for (let i in brkpts.container_max_widths) {
  items.push(`  ${i}: ${brkpts.container_max_widths[i]}` + (brkpts.container_max_widths[i] > 0? 'px' : ''));
}
str += '$container-max-widths: (\n' + items.join(',\n') + '\n);\n\n';

str += `
$grid-columns: ${brkpts.grid_columns};
$grid-gutter-width: ${brkpts.grid_gutter_width};
$grid-row-columns: ${brkpts.grid_row_columns};
$container-padding-x: ${brkpts.container_padding_x};
`;

fs.writeFileSync(dest, str);

console.log('* build_scss_breakpoint.js end *');
