cd "$(dirname "$0")"

# npm init

npm i --save --only=prod jquery
npm i --save --only=prod popper.js
npm i --save --only=prod bootstrap
npm i --save --only=prod datatables.net
npm i --save --only=prod datatables.net-bs5
# npm i --save --only=prod datatables.net-bs4
# npm i --save --only=prod datatables.net-responsive-bs4
# npm i --save --only=prod datatables.net-fixedheader-bs4
# npm i --save --only=prod datatables.net-rowreorder-bs4
# npm i --save --only=prod fontfaceobserver

npm i --save --only=prod moment
npm i --save --only=prod mustache
# npm i --save --only=prod picturefill
npm i --save --only=prod vanilla-lazyload
# npm i --save --only=prod svg4everybody
# npm i --save --only=prod js-cookie
# npm i --save jspdf
# npm i --save pdfobject

npm i --save --only=prod @massimo-cassandro/js-file-uploader
npm i --save --only=prod @massimo-cassandro/cookie-consent
npm i --save --only=prod @massimo-cassandro/layout-tools
npm i --save --only=prod @massimo-cassandro/sharing-links
npm i --save --only=prod @massimo-cassandro/m-utilities
npm i --save --only=prod @massimo-cassandro/symfony-bootstrap-form-theme

# https://github.com/fontsource/fontsource
npm i --save @fontsource/xxxxx


# icone standard
npm i --save-dev --no-optional gulp@latest gulp-chmod gulp-rename gulp-svgmin gulp-svgstore

npm i --save-dev --no-optional gulp@latest
npm i --save-dev --no-optional gulp-chmod
npm i --save-dev --no-optional gulp-rename
npm i --save-dev --no-optional gulp-svgmin
npm i --save-dev --no-optional gulp-svgstore
# npm i --save-dev --no-optional fs

npm i --save-dev --no-optional gulp-concat
npm i --save-dev --no-optional gulp-flatmap
npm i --save-dev --no-optional gulp-inject-string
# npm i --save-dev --no-optional gulp-remove-svg-tag


npm i --save-dev --no-optional js-beautify
npm i --save-dev --no-optional prismjs

npm i --save-dev --no-optional rollup
npm i --save-dev --no-optional rollup-plugin-terser
npm i --save-dev --no-optional rollup-plugin-sourcemaps
npm i --save-dev --no-optional @rollup/plugin-commonjs # necessario per jquery
npm i --save-dev --no-optional @rollup/plugin-node-resolve
npm i --save-dev --no-optional rollup-plugin-minify-html-literals # https://github.com/asyncLiz/rollup-plugin-minify-html-literals
npm i --save-dev --no-optional rollup-plugin-filesize # https://github.com/ritz078/rollup-plugin-filesize#readme

npm i --save-dev --no-optional sass

npm i --save-dev --no-optional eslint
npm i --save-dev --no-optional stylelint
npm i --save-dev --no-optional stylelint-config-twbs-bootstrap
npm i --save-dev --no-optional eslint-plugin-import eslint-plugin-node eslint-plugin-promise eslint-config-standard

# npm i --save-optional stylelint-config-sass-guidelines
# npm i --save-optional stylelint-config-standard
# npm i --save-optional stylelint-config-rational-order
# npm i --save-optional stylelint-config-concentric-order
