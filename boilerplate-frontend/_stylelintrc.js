/*
  https://stylelint.io/user-guide/configure
  https://github.com/kristerkari/stylelint-scss
  https://github.com/chaucerbao/stylelint-config-concentric-order
*/

module.exports = {
  extends: [
    // 'stylelint-config-standard',
    // 'stylelint-config-rational-order'
    'stylelint-config-concentric-order'
  ],
  plugins: [
    'stylelint-scss'
  ],

  rules: {
    'selector-list-comma-newline-after': 'always-multi-line',
    'number-leading-zero': 'never',
    'max-nesting-depth': [
      3,
      {
        ignore: ['pseudo-classes']
      }
    ],
    'function-parentheses-space-inside': 'never-single-line',
    'selector-no-qualifying-type': [
      false,
      {
        ignore: ["attribute", "class", "id"]
      }
    ]
    /* ,
    "plugin/rational-order": [
      true,
      {
        "border-in-box-model": false,
        "empty-line-between-groups": true
      }
    ] */
  }
};
