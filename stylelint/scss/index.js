/* eslint-env node */
'use strict';

module.exports = {
  extends: [
    '../base/scss.js'
  ],

  'ignoreFiles': ['**/*.css', '**/node_modules/**/*.*', '**/vendor/**/*.*'],

  rules: {
    'selector-list-comma-newline-after': 'always-multi-line',
    'number-leading-zero': null,
    'string-quotes': 'single',
    'no-missing-end-of-source-newline': null,
    'value-list-comma-newline-after': 'always-multi-line',
    'value-list-comma-space-after': 'always-single-line',
    // 'declaration-block-semicolon-newline-before': 'always-multi-line',
    'max-nesting-depth': [
      3,
      {
        ignore: ['pseudo-classes']
      }
    ],
    'scss/at-import-no-partial-leading-underscore': null,
    'function-parentheses-space-inside': 'never-single-line',
    'selector-no-qualifying-type': [
      false,
      {
        ignore: ['attribute', 'class', 'id']
      }
    ]
  }
};
