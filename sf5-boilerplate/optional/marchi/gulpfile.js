/* eslint-env node */
// gulpfile marchi
// gulp [--gulpfile __gulpfile.js__]


/*
  Questa procedura esegue la minificazione e ottimizzazione dei marchi SVG
  e le combina in un unico file `marchi.svg`
*/

var gulp = require('gulp')
  //,del = require('del')
  ,replace = require('gulp-replace')
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
  svg_files_folder = 'svg',
  svg_files_prefix = '',
  output_file = 'marchi.svg',
  icon_list_file = 'icon_list_marchi.js',
  id_prefix,
  sizes = [],
  current_file
;
gulp.task('marchi', function() {
  return gulp.src([
  svg_files_folder + '/*.svg'])
  .pipe(rename(function (path) {
    path.basename = path.basename.replace(svg_files_prefix, '');
    id_prefix = path.basename + '_';
    icon_list.push(path.basename);
    current_file = path.basename; //.replace(/\-/g, '_');
    return path;
  }))
  .pipe( replace(/viewBox="(.*?)"/i, function (match, vbox) {

    var viewBox = vbox.split(' ');
    sizes.push([current_file, +viewBox[2], +viewBox[3]]);
    //console.log(vbox, '->', current_file, +viewBox[2], +viewBox[3]);
    return(match);
  }))
  .pipe(svgmin(function () {
    return {
    // https://github.com/svg/svgo/tree/master/plugins
    plugins: [
      { removeDoctype: true }
    // , { prefixIds:
    //     {
    //       prefixIds: true,
    //       prefixClassNames: false,
    //       prefix:
    //     }
    //   }
    , { cleanupIDs: { remove: true, minify: true, prefix: id_prefix} }
    , { removeComments: true }
    , { removeTitle: true }
    , { removeDimensions: true }
    , { cleanupNumericValues: { floatPrecision: 3  } }
    //, { convertColors: { names2hex: true, rgb2hex: true } }
    , { removeStyleElement: false }
    , { removeUselessDefs: false }
    , { removeEmptyContainers: false }
    //, { removeAttrs: { attrs: ['(class|style|data.*)', 'svg:(width|height)'] } }
    //, { addAttributesToSVGElement: {attribute: "#{$attr}"}}
    ]
    //,js2svg: { pretty: true }
    };
  }))
  // .pipe(addsrc(svg_files_folder + '/sara-assicurazioni.svg'))
  .pipe(svgstore())
  //.pipe( replace(/<style>(.*?)<\/style>/g, '') )
  //.pipe( replace(/<title>(.*?)<\/title>/g, '') )
  .pipe( rename(output_file) )
  .pipe(chmod(0o755))

  .pipe(gulp.dest('./'));
});


gulp.task('icon_list', function(cb) {
  var str = '// lista id marchi per demo\n' +
  '// NB: questo file è generato da uno script gulp, eventuali modifiche saranno sovrascritte\n' +

  'const icon_list = ' + JSON.stringify(icon_list.sort(), null, '  ').replace(/"/g, '\'') + ';';

  //str +=  '\n\nexport default icon_list;';

  return fs.writeFile(icon_list_file, str, cb);
});

gulp.task('build_sizes_list', function(cb) {

  let sizes_map = [];

  sizes.forEach(function (item, idx) {

    sizes_map.push('  ' + item[0] + ': (\n' +
      '    w: ' + item[1] + 'px,\n' +
      '    h: ' + item[2] + 'px,\n' +
      '    wh_ratio: ' + (item[1] / item[2]) + '\n' +
      '  )'
    );



  });

  let str = '// lista dimensioni elementi svg per scss\n' +
    '// NB: questo file è generato da uno script gulp, eventuali modifiche saranno sovrascritte\n\n' +

    '$marchi_sizes: (\n' +
      sizes_map.join(',\n') +
    '\n);'
  ;

  return fs.writeFile('_sizes.scss', str, cb);
});



gulp.task('default',
  gulp.series('marchi',
  gulp.parallel(
    'icon_list',
    'build_sizes_list'
  )
  )
);

