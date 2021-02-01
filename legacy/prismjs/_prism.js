/*
//main
@codekit-prepend '../../../../prismjs/components/prism-core.js'
@codekit-prepend '../../../../prismjs/components/prism-markup.js'
@codekit-prepend '../../../../prismjs/components/prism-css.js'
@codekit-prepend '../../../../prismjs/components/prism-clike.js'
@codekit-prepend '../../../../prismjs/components/prism-javascript.js'

//languages
@codekit-prepend '../../../../prismjs/components/prism-css-extras.js'
@codekit-prepend '../../../../prismjs/components/prism-json.js'
-codekit-prepend '../../../../prismjs/components/prism-less.js'
-codekit-prepend '../../../../prismjs/components/prism-markdown.js'
@codekit-prepend '../../../../prismjs/components/prism-markup-templating.js' // richiesto da php
@codekit-prepend '../../../../prismjs/components/prism-php.js'
-codekit-prepend '../../../../prismjs/components/prism-php-extras.min.js'
-codekit-prepend '../../../../prismjs/components/prism-pug.js'
@codekit-prepend '../../../../prismjs/components/prism-scss.js'
-codekit-prepend '../../../../prismjs/components/prism-sql.js'
-codekit-prepend '../../../../prismjs/components/prism-stylus.js'
@codekit-prepend '../../../../prismjs/components/prism-twig.js'
-codekit-prepend '../../../../prismjs/components/prism-typescript.js'
-codekit-prepend '../../../../prismjs/components/prism-yaml.js'

//plugins
-codekit-prepend '../../../../prismjs/plugins/command-line/prism-command-line.js'
@codekit-prepend '../../../../prismjs/plugins/line-numbers/prism-line-numbers.js'
@codekit-prepend '../../../../prismjs/plugins/normalize-whitespace/prism-normalize-whitespace.js'
@codekit-prepend '../../../../prismjs/plugins/previewers/prism-previewers.js'
@codekit-prepend '../../../../prismjs/plugins/toolbar/prism-toolbar.js' // richiesto da show-languages
@codekit-prepend '../../../../prismjs/plugins/show-language/prism-show-language.js'
@codekit-prepend '../../../../prismjs/plugins/highlight-keywords/prism-highlight-keywords.js'
-codekit-prepend '../../../../prismjs/plugins/line-highlight/prism-line-highlight.js'
@codekit-prepend '../../../../prismjs/plugins/unescaped-markup/prism-unescaped-markup.js'
*/

/* global Prism */

Prism.plugins.NormalizeWhitespace.setDefaults({
  'remove-trailing': false,
  'remove-indent': false,
  'left-trim': false,
  'right-trim': false,
  //'break-lines': 80,
  //'indent': 2,
  'remove-initial-line-feed': true,
  'tabs-to-spaces': 2
  //'spaces-to-tabs': 4
});
