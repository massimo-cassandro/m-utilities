/* eslint-env node */

// https://github.com/postcss/postcss-cli
// https://purgecss.com/configuration.html

const purgecss = require('@fullhuman/postcss-purgecss');

module.exports = {
  plugins: [
    require('autoprefixer'),
    purgecss({
      content: [
        './AppBundle/Resources/public/js/**/*.js',
        './AppBundle/Resources/public/apps/**/*.js',
        './AppBundle/Resources/views/**/*.twig',
        './AppBundle/Resources/public/legacy/**/*.js'
      ],
      // css: ['./AppBundle/Resources/public/css/**/*.css'],
      // output: ['./AppBundle/Resources/public/css/'],
      variables: true,
      //fontFace: true,
      safelist: {
        standard: [/rounded-pill$/],
        deep: [
          /^col-/, /^row/, /^sharing-links/, /^fupl/, /^rcolumns/, /^d-/,
          /^position-/, /^flex-/, /^container/, /^tooltip/, /^bs-/,/^col-/, /^row/,
          /^rcolumns/, /^d-/, /^row-cols/,  /^offset/,
          /^position-/, /^flex-/, /^align-/, /^justify-/, /^order-/, /^container/, /^tooltip/, /^bs-/,
          /^mt-/, /^mr-/, /^mb-/, /^ml-/, /^pt-/, /^pr-/, /^pb-/, /^pl-/,
          /^me-/, /^ms-/, /^pe-/, /^ps-/,
          /^m-alert/, /^sf-/, /^form-/, /^grecaptcha-/, /^box/, /^sharing-links/,
          /^was-validated/, /^border/,

          /^btn/, /^input-group/, /^alert/, /^bs-/, /^spinner/, /^embed-/,
          /^(min-|max-)?(m|p|vh|vw|w|h)(t|r|b|l|x|y)?-/,

          /^hmenu/,
          /^select2/,
          /^mAlert/,
          /^carousel/,
          /^justify-/,
          /^autocomplete/,
          /^rating/

        ],
        // greedy: [/yellow$/]
      }
    }),
    require('postcss-csso')({
      restructure: false,
      sourceMap: true,
      stat: true
    })
  ]
};
