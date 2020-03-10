/* eslint-env node */
// gulpfile icone
// gulp [--gulpfile __gulpfile.js__]


/*
  Questa procedura esegue la minificazione e ottimizzazione delle icone SVG
  e le combina in un unico file `icone.svg`

  La procedura esegue inoltre:

  * la costruzione del file `icon_list.js`, utilizzato dal `demo-icone.html`
    per la visualizzazione di una pagina di riepilogo di tutte le icone
  * la costruzione del file `esa/public/assets/_shared/_svg_elements.scss` che
    che contiene una selezione di alcune icone in forma di variabili sass
    per la loro inclusione nel css.

*/

var gulp = require('gulp')
  //,del = require('del')
  //,replace = require('gulp-replace')
  ,rename = require('gulp-rename')
  ,chmod = require('gulp-chmod')
  ,svgstore = require('gulp-svgstore')
  ,svgmin = require('gulp-svgmin')
  //,addsrc = require('gulp-add-src')
  ,concat = require('gulp-concat')
  ,inject = require('gulp-inject-string')
  ,flatmap = require('gulp-flatmap')
  ,fs = require('fs')
;


var icon_list = [], // lista delle icone, utilizzate per il file demo
  svg_files_folder = 'svg_files',
  svg_files_prefix = 'esa-icone_',
  output_file = 'icone.svg',
  icon_list_file = 'icon_list.js',
  svg_to_scss = ['check', 'danger', 'info'], // icone da convertire in variabili scss
  icons_scss_file = '_icone_svg.scss',
  svgmin_plugins = [
    { cleanupIDs: { remove: true, minify: true } }
    , { removeDoctype: true }
    , { removeComments: true }
    , { removeTitle: true }
    , { removeDimensions: true }
    , { cleanupNumericValues: { floatPrecision: 3  } }
    , { convertColors: { names2hex: true, rgb2hex: true } }
    , { removeStyleElement: true }
    , { removeUselessDefs: true }
    , { removeEmptyContainers: true }
    , { removeAttrs: { attrs: ['(fill|stroke|class|style|data.*)', 'svg:(width|height)'] } }
    //, { addAttributesToSVGElement: {attribute: "#{$attr}"}}
  ]
;
gulp.task('icone', function() {
  return gulp.src([
    svg_files_folder + '/*.svg',
    '!' + svg_files_folder + '/' + svg_files_prefix + '@*.svg'
  ])
    .pipe(rename(function (path) {
      path.basename = path.basename.replace(svg_files_prefix, '');

      icon_list.push(path.basename);

      return path;
    }))
    .pipe(svgmin(function () {
      return {
        // https://github.com/svg/svgo/tree/master/plugins
        plugins: svgmin_plugins
        //,js2svg: { pretty: true }
      };
    }))
  //.pipe(addsrc(['icone/icona_da_non_minificare.svg']))
    .pipe(svgstore())
  //.pipe( replace(/<style>(.*?)<\/style>/g, '') )
  //.pipe( replace(/<title>(.*?)<\/title>/g, '') )
    .pipe( rename(output_file) )
    .pipe(chmod(0o755))
    .pipe(gulp.dest('./'));
});


gulp.task('icon_list', function(cb) {
  var str = '// lista id icone per demo\n' +
    '// NB: questo file è generato da uno script gulp, eventuali modifiche saranno sovrascritte\n' +
    'const icon_list = ' + JSON.stringify(icon_list.sort(), null, '  ').replace(/"/g, '\'') + ';';

  //str +=  '\n\nexport default icon_list;';

  return fs.writeFile(icon_list_file, str, cb);
});


gulp.task('svg2scss', function () {
  var intro_str = '// icone svg per inclusione nei scss\n' +
      '// NB: questo file è generato da uno script gulp, eventuali modifiche saranno sovrascritte\n\n';

  let src_list = [];
  svg_to_scss.forEach(icon => {
    src_list.push(svg_files_folder + '/' + svg_files_prefix + icon + '.svg');
  });

  return gulp.src(src_list)
    .pipe(flatmap(function(stream , file){
      var icon_name = file.path.replace(/^\/(.+\/)*(.+)\.(.+)$/, '$2').replace(svg_files_prefix, '');

      return stream
        .pipe(svgmin(function () {
          return {
            // https://github.com/svg/svgo/tree/master/plugins
            plugins: svgmin_plugins
            //,js2svg: { pretty: true }
          };
        })) // end svgmin
        .pipe(inject.wrap('$icona_' + icon_name + ': \'', '\';'));

    })) // end flatmap
    .pipe(concat( icons_scss_file ))
    .pipe(inject.prepend( intro_str ))
    .pipe(chmod(0o755))
    .pipe(gulp.dest('./'));
});

gulp.task('default',
  gulp.series('icone',
    gulp.parallel(
      'icon_list',
      'svg2scss'
    )
  )
);
