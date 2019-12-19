/* eslint-env node */
/* global gutil */
// gulpfile icone
// gulp [--gulpfile __gulpfile.js__]


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


var icon_list = []; // lista delle icone, utilizzate per il file demo
var icon_prefix = 'icone-';


gulp.task('icone', function() {
  return gulp.src([
    'svg_files/*.svg',
    '!svg_files/' + icon_prefix + '@*.svg'
  ])
    .pipe(rename(function (path) {
      path.basename = path.basename.replace(icon_prefix, '');
      //path.basename = 'icon-' + icon_name;

      icon_list.push(path.basename);

      return path;
    }))
    .pipe(svgmin(function () {
      return {
        // https://github.com/svg/svgo/tree/master/plugins
        plugins: [
          { cleanupIDs: { remove: true, minify: true } }
          , { removeDoctype: true }
          , { removeComments: true }
          , { removeTitle: true }
          , { removeDimensions: true }
          , { cleanupNumericValues: { floatPrecision: 3  } }
          , { convertColors: { names2hex: true, rgb2hex: true } }
          , { removeAttrs: { attrs: ['(fill|stroke|class|style)', 'svg:(width|height)'] } }
        ]
        //,js2svg: { pretty: true }
      };
    }))
  //.pipe(addsrc(['icone/icona_da_non_minificare.svg']))
    .pipe(svgstore())
  //.pipe( replace(/<style>(.*?)<\/style>/g, '') )
  //.pipe( replace(/<title>(.*?)<\/title>/g, '') )
    .pipe( rename('icone.svg') )
    .pipe(chmod(0o755))
    .pipe(gulp.dest('./'));
});


gulp.task('icon_list', function(cb) {
  var str = '// lista id icone per demo\n' +
    '// NB: questo file è generato da uno script gulp, eventuali modifiche saranno sovrascritte\n' +
    'const icon_list = ' + JSON.stringify(icon_list.sort(), null, '  ').replace(/"/g, '\'') + ';\n\n' +
    'export default icon_list;';

/*   return file('icon_list_ada.js', str, { src: true })
    .pipe(gulp.dest('./')); */

  // return string_src('icon_list_ada.js', str)
  //   .pipe(gulp.dest('./'));

  return fs.writeFile('icon_list.js', str, cb);
});





gulp.task('svg2scss', function () {
  var intro_str = '// icone svg per inclusione nel css\n' +
      '// NB: questo file è generato da uno script gulp, eventuali modifiche saranno sovrascritte\n\n';

  return gulp.src([
    'svg_files/' + icon_prefix + 'freccia.svg',
    'svg_files/' + icon_prefix + 'ui-errore.svg',
    'svg_files/' + icon_prefix + 'ui-info.svg',
    'svg_files/' + icon_prefix + 'ui-avviso.svg',
    'svg_files/' + icon_prefix + 'ui-success.svg',
    //'svg_files/' + icon_prefix + 'ui-elimina.svg',
    'svg_files/' + icon_prefix + 'ui-drag.svg'
  ])
    .pipe(flatmap(function(stream , file){
      var icon_name = file.path.replace(/^\/(.+\/)*(.+)\.(.+)$/, '$2').replace(icon_prefix, '');

      return stream
        .pipe(svgmin(function () {
          return {
            // https://github.com/svg/svgo/tree/master/plugins
            plugins: [
              { cleanupIDs: { remove: true, minify: true } }
              , { removeDoctype: true }
              , { removeComments: true }
              , { removeTitle: true }
              , { removeDimensions: true }
              , { cleanupNumericValues: { floatPrecision: 3  } }
              , { convertColors: { names2hex: true, rgb2hex: true } }
              , { removeAttrs: { attrs: ['(fill|stroke|class|style)', 'svg:(width|height)'] } }
              //, { addAttributesToSVGElement: {attribute: "#{$attr}"}}
            ]
            //,js2svg: { pretty: true }
          };
        })) // end svgmin
        .pipe(inject.wrap('$icona_' + icon_name + ': \'', '\';'));

    })) // end flatmap
    .pipe(concat('_icone_svg.scss'))
    .pipe(inject.prepend(intro_str))
    .pipe(chmod(0o755))
    .pipe(gulp.dest('./'));

});


// copia del file xxx in views/security per il suo utilizzo
// nella pagina di login
gulp.task('copy2login', function () {
  return gulp.src('svg_files/' + icon_prefix + 'ada_icona.svg')
    .pipe(svgmin(function () {
      return {
        // https://github.com/svg/svgo/tree/master/plugins
        plugins: [
          { cleanupIDs: { remove: true, minify: true } }
          , { removeDoctype: true }
          , { removeComments: true }
          , { removeTitle: true }
          , { removeDimensions: true }
          , { cleanupNumericValues: { floatPrecision: 3  } }
          , { convertColors: { names2hex: true, rgb2hex: true } }
          , { removeAttrs: { attrs: ['(fill|stroke|class|style)', 'svg:(width|height)'] } }
          //, { addAttributesToSVGElement: {attribute: "#{$attr}"}}
        ]
        //,js2svg: { pretty: true }
      };
    })) // end svgmin
    .pipe( rename('xxx.svg') )
    .pipe(gulp.dest('../../../views/security/'));
});


gulp.task('default',
  gulp.series('icone',
    gulp.parallel(
      'icon_list',
      'svg2scss',
      'copy2login'
    )
  )
);
