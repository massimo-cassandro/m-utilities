/* eslint-env node */
// genera include twig per il preload dei file woff2

// v. 2

const gulp = require('gulp'),
  fs = require('fs');

// tutti i percorsi relativi a questo file

const twig_preload_file = '../../gaav-sf/templates/_shared/fonts-preload.incl.html.twig',
  root_output_dir = 'fonts', // no slashes
  fs_output_dir = `../../gaav-sf/public/${root_output_dir}/`,
  fontsource_dir = '../../node_modules/@fontsource/',

  fonts = [
    {
      font_basename: 'merriweather-sans',
      non_variables: {
        // 200,
        300: ['italic', 'normal'],
        400: ['italic', 'normal'],
        // 500,
        600: ['italic', 'normal'],
        700: ['italic', 'normal'],
        // 800,
        // 900
      },
      variables : {
        'wghtOnly': ['italic', 'normal']
      }
    },
    {
      font_basename: 'playfair-display',
      non_variables: {
        400: ['normal'],
      },
      variables : {
        'wghtOnly': ['normal']
      }
    }
  ];

let font_files = [], preload_font_files = [];


fonts.forEach(item => {

  const this_fontsource_dir = `${fontsource_dir}/${item.font_basename}/files`;

  let preload_variables = [], preload_not_variables = [];

  // files da copiare
  if(item.non_variables) {
    for(let weight in item.non_variables) {
      item.non_variables[weight].forEach(style => {
        const fontname = `${item.font_basename}-latin-${weight}-${style}`,
          fontpath = `${this_fontsource_dir}/${fontname}`;

        font_files.push(`${fontpath}.woff`, `${fontpath}.woff2`);
        preload_not_variables.push(`${fontname}.woff2`);
      });
    }
  }

  if (item.variables) {
    for(let feature in item.variables) {
      item.variables[feature].forEach(style => {
        const fontname = `${item.font_basename}-latin-variable-${feature}-${style}.woff2`;

        font_files.push(`${this_fontsource_dir}/${fontname}`);
        preload_variables.push(`${fontname}`);
      });
    }
  }

  // files per preload (variabili o woff2, non woff)
  preload_font_files = preload_font_files.concat(
    preload_variables.length? preload_variables : preload_not_variables
  );

});

gulp.task('delete-previous-files', done =>  {
  fs.readdirSync(fs_output_dir).forEach(file => {
    console.log(`Rimozione file "${fs_output_dir + file}"`); // eslint-disable-line
    fs.unlinkSync(fs_output_dir + file);
  });

  done();

});

gulp.task('copy-font-files', function() {

  return gulp.src(font_files)
    .pipe(gulp.dest(fs_output_dir));
});

gulp.task('generate_preload_file', function(cb) {
  let str = '{# NB: questo file è generato da uno script gulp, eventuali modifiche saranno sovrascritte #}\n';

  // let font_files = fs.readdirSync(fs_output_dir).filter(f => /-variable-(.*?)\.woff2$/.test(f));

  // if(!font_files.length) {
  //   font_files = fs.readdirSync(fs_output_dir).filter(f => /\.woff2$/.test(f));
  // }

  preload_font_files.forEach(file => {
    str += `<link rel="preload" href="{{ asset('/${root_output_dir}/${file}') }}" as="font" type="font/woff2" crossorigin>\n`;
  });

  return fs.writeFile(twig_preload_file, str, cb);
});

gulp.task('default',
  gulp.series('delete-previous-files', 'copy-font-files','generate_preload_file')
);
