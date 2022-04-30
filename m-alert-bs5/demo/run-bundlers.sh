npx sass m-alert-bs5-demo.scss:m-alert-bs5-demo.css \
  --load-path=../../node_modules --load-path=../  --style=expanded --watch & \
rollup --input m-alert-bs5-demo.js --file m-alert-bs5-demo.min.js  \
  --format iife --sourcemap --plugin 'terser={compress: {passes: 2}}' \
  --plugin @rollup/plugin-node-resolve --plugin @rollup/plugin-commonjs \
  --plugin rollup-plugin-filesize --watch
