/* eslint-env node */
// genera include twig per il preload dei file woff2


const gulp = require('gulp'),
  fs = require('fs');

// tutti i percorsi relativi a questo file

const config = [ // ogni elemento corrisponde ad un unico file di preload
  {
    twig_preload_file   : '../../esa-3-sf/templates/_shared/barlow-font-preload.incl.html.twig',
    font_output_dir     : '../../esa-3-sf/public/fonts/',
    font_basename       : 'barlow',
    fonts : [
      {
        font_src_dir        : '../../node_modules/@fontsource/barlow/files/',
        font_weights: [
          // 200,
          300,
          400,
          500,
          600,
          // 700,
          // 800,
          // 900
        ],
        font_styles: ['italic', 'normal']
      }
    ]
  },
  {
    twig_preload_file   : '../../esa-3-sf/templates/_shared/barlow-condensed-font-preload.incl.html.twig',
    font_output_dir     : '../../esa-3-sf/public/fonts/',
    font_basename       : 'barlow-condensed',
    fonts : [
      {
        font_src_dir        : '../../node_modules/@fontsource/barlow-condensed/files/',
        font_weights: [
          // 100,
          200,
          // 300,
          // 400,
          500,
          // 600,
          // 700,
          // 800,
          // 900
        ],
        font_styles: [/* 'italic',  */'normal']
      }
    ]
  }
];




// variable fonts
// let font_files = [
//   // 'barlow-latin-variable-full-italic.woff2',
//   // 'barlow-latin-variable-full-normal.woff2',
//   'barlow-latin-variable-wghtOnly-italic.woff2',
//   'barlow-latin-variable-wghtOnly-normal.woff2'
// ],

// https://medium.com/shopback-tech-blog/https-medium-com-shopback-engineering-construct-gulp-series-tasks-dynamically-db744b923229
function manage_fonts(done){
  const tasks = config.forEach(item => {

    let font_files = [];

    item.font_weights.forEach(weight => {
      item.font_styles.forEach(style => {
        font_files.push(
          `${item.font_basename}-latin-${weight}-${style}.woff`,
          `${item.font_basename}-latin-${weight}-${style}.woff2`
        );

      });
    });

    gulp.task('delete-previous-files', done =>  {
      fs.readdirSync(item.output_dir).forEach(file => {
        console.log(`Rimozione file "${output_dir + file}"`); // eslint-disable-line
        fs.unlinkSync(item.output_dir + file);
      });

      done();

    });

    gulp.task('copy-font-files', function() {

      return gulp.src(font_files.map(file => item.font_src_dir + file))
        .pipe(gulp.dest(item.output_dir));
    });

    gulp.task('generate_preload_file', function(cb) {
      let str = '{# NB: questo file è generato da uno script gulp, eventuali modifiche saranno sovrascritte #}\n';

      // solo i file .woff2
      fs.readdirSync(item.output_dir).filter(f => /\.woff2$/.test(f))
        .forEach(file => {
          str += `<link rel="preload" href="{{ asset('/fonts/${file}') }}" as="font" type="font/woff2" crossorigin>\n`;
        });

      return fs.writeFile(item.twig_preload_file, str, cb);
    });

    return gulp.task('default',
      gulp.series('delete-previous-files', 'copy-font-files','generate_preload_file')
    );
  });

  return gulp.series(...tasks, (seriesDone) => {
    seriesDone();
    done();
  })();
};

gulp.task('default',
  gulp.series('delete-previous-files', 'copy-font-files','generate_preload_file')
);
