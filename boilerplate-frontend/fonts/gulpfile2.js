/* eslint-env node */
// genera include twig per il preload dei file woff2


const gulp = require('gulp'),
  fs = require('fs');

// tutti i percorsi relativi a questo file
const font_src_dir =  '../../node_modules/@fontsource/barlow/files/',
  twig_preload_file = '../../esa-3-sf/templates/_shared/fonts-preload.incl.html.twig',
  output_dir = '../../esa-3-sf/public/fonts/';


// variable fonts
// let font_files = [
//   // 'barlow-latin-variable-full-italic.woff2',
//   // 'barlow-latin-variable-full-normal.woff2',
//   'barlow-latin-variable-wghtOnly-italic.woff2',
//   'barlow-latin-variable-wghtOnly-normal.woff2'
// ],

let font_files = [],
  // non variable-fonts
  font_weights = [
    // 200,
    300,
    400,
    500,
    600,
    // 700,
    // 800,
    // 900
  ],
  font_styles = ['italic', 'normal'];

font_weights.forEach(weight => {
  font_styles.forEach(style => {
    font_files.push(
      `barlow-latin-${weight}-${style}.woff`,
      `barlow-latin-${weight}-${style}.woff2`
    );

  });
});

gulp.task('delete-previous-files', done =>  {
  fs.readdirSync(output_dir).forEach(file => {
    console.log(`Rimozione file "${output_dir + file}"`); // eslint-disable-line
    fs.unlinkSync(output_dir + file);
  });

  done();

});

gulp.task('copy-font-files', function() {

  return gulp.src(font_files.map(file => font_src_dir + file))
    .pipe(gulp.dest(output_dir));
});

gulp.task('generate_preload_file', function(cb) {
  let str = '{# NB: questo file è generato da uno script gulp, eventuali modifiche saranno sovrascritte #}\n';

  // solo i file .woff2
  fs.readdirSync(output_dir).filter(f => /\.woff2$/.test(f))
    .forEach(file => {
      str += `<link rel="preload" href="{{ asset('/fonts/${file}') }}" as="font" type="font/woff2" crossorigin>\n`;
    });

  return fs.writeFile(twig_preload_file, str, cb);
});


gulp.task('default',
  gulp.series('delete-previous-files', 'copy-font-files','generate_preload_file')
);
