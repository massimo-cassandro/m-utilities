/* eslint-env node */
// genera include twig per il preload dei file woff2

const target_file = '../../../templates/_shared/fonts-preload.incl.html.twig',
  font_dirs = ['merriweather-sans', 'playfair-display'];

var gulp = require('gulp')
  //,del = require('del')
  //,replace = require('gulp-replace')
  // ,rename = require('gulp-rename')
  // ,chmod = require('gulp-chmod')
  ,fs = require('fs')
;


gulp.task('default', function(cb) {
  let str = '{# NB: questo file è generato da uno script gulp, eventuali modifiche saranno sovrascritte #}\n';

  font_dirs.forEach(dir => {
    fs.readdirSync(dir).filter(f => /\.woff2$/.test(f)).forEach(file => {
      str += `<link rel="preload" href="{{ asset('/assets/fonts/${dir}/${file}') }}" as="font">\n`;
    });
  });

  return fs.writeFile(target_file, str, cb);
});
