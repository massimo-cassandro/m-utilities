/* eslint-env node */
/* eslint-disable no-console */

import icon_list from '../front-end/icone/icon-list.mjs';
import * as fs from 'fs';

const sources = [
    './AppBundle/Resources/public/css/ada.css'
  ],
  snippet_file = './.vscode/ada.code-snippets',
  snippet_key = 'ADA Custom properties',
  icon_list_key = 'ADA Icon list',
  custom_var_prefix = 'ada-';

let custom_properties = [];

sources.forEach(css_file => {
  let css_content = fs.readFileSync(css_file).toString();

  const regex = new RegExp(`--${custom_var_prefix}[a-zA-Z0-9._-]*?: ?(.*?);`, 'gi'),
    this_cust_props = css_content.match(regex);

  custom_properties = custom_properties.concat(this_cust_props);
});


custom_properties = custom_properties.map(item => item.split(':')[0].trim());
custom_properties.sort();
custom_properties = [...new Set(custom_properties)];

let vscode_snippet_body = `var(--${custom_var_prefix}\${1|` +
  custom_properties.reduce((result,item) => `${result},${item}`).replaceAll(`--${custom_var_prefix}`, '') +
  '|})$0';


// VSCODE snippets reading and update
let snippets = JSON.parse(fs.readFileSync(snippet_file).toString());

if(snippets[snippet_key]) {
  snippets[snippet_key].body = [vscode_snippet_body];
  // snippets[icon_list_key].body = ['icon-${1|' + icon_list.map(i => i.replace(/^icon-/, '')).join(',') + '|}$0'];
  snippets[icon_list_key].body = ['${1|' + icon_list.join(',') + '|}$0'];

  fs.writeFileSync(snippet_file, JSON.stringify(snippets, null, '  '));

  console.log('*** end ***');

} else {
  console.error(`******ERROR\n'${snippet_key}' snippet doesn't exist\n************`);
}

