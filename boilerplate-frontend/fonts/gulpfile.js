/* eslint-env node */
// genera include twig per il preload dei file woff2

// v. 2

const gulp = require('gulp'),
  fs = require('fs');

// tutti i percorsi relativi a questo file

const twig_preload_file = '../../gaav-sf/templates/_shared/fonts-preload.incl.html.twig',
  output_dir = '../../gaav-sf/public/fonts/',
  fontsource_dir = '../../node_modules/@fontsource/',

  fonts = [
    {
      font_basename: 'merriweather-sans',
      // non_variables: {
      //   // 200,
      //   300: ['italic', 'normal'],
      //   400: ['italic', 'normal'],
      //   // 500,
      //   600: ['italic', 'normal'],
      //   700: ['italic', 'normal'],
      //   // 800,
      //   // 900
      // },
      variables : {
        'wghtOnly': ['italic', 'normal']
      }
    },
    {
      font_basename: 'playfair-display',
      // non_variables: {},
      variables : {
        'wghtOnly': ['italic', 'normal']
      }
    }
  ];

let font_files = [];


fonts.forEach(item => {

  const this_fontsource_dir = `${fontsource_dir}/${item.font_basename}/files`;

  if(item.non_variables) {
    for(let weight in item.non_variables) {
      item.non_variables[weight].forEach(style => {
        const fontname = `${this_fontsource_dir}/${item.font_basename}-latin-${weight}-${style}`;
        font_files.push(`${fontname}.woff`, `${fontname}.woff2`);
      });
    }
  }

  if (item.variables) {
    for(let feature in item.variables) {
      item.variables[feature].forEach(style => {
        font_files.push(
          `${this_fontsource_dir}/${item.font_basename}-latin-variable-${feature}-${style}.woff2`
        );
      });
    }
  }
});

gulp.task('delete-previous-files', done =>  {
  fs.readdirSync(output_dir).forEach(file => {
    console.log(`Rimozione file "${output_dir + file}"`); // eslint-disable-line
    fs.unlinkSync(output_dir + file);
  });

  done();

});

gulp.task('copy-font-files', function() {

  return gulp.src(font_files)
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
