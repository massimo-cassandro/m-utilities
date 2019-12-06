/* eslint-env node */
// gulpfile elementi_grafici
// gulp [--gulpfile __gulpfile.js__]


/*
  Questa procedura esegue la minificazione e ottimizzazione delle elementi_grafici SVG
  e le combina in un unico file `elementi_grafici.svg`

  La procedura esegue inoltre la costruzione del file `elementi_grafici_list.js`,
  utilizzato dal `demo-elementi_grafici.html`
  per la visualizzazione di una pagina di riepilogo di tutte le elementi_grafici

*/

var gulp = require('gulp')
	//,del = require('del')
	,replace = require('gulp-replace')
	,rename = require('gulp-rename')
	//,markdown = require('gulp-markdown')
	,file = require('gulp-file')
	//,fs = require("fs")
	,chmod = require('gulp-chmod')
	,svgstore = require('gulp-svgstore')
	,svgmin = require('gulp-svgmin')
	//,addsrc = require('gulp-add-src')
	//,concat = require('gulp-concat')
	//,inject = require('gulp-inject-string')
	//,flatmap = require('gulp-flatmap')
;


var elementi_grafici_list = [], // lista delle elementi_grafici, utilizzate per il file demo
  current_file,
  elementi_grafici_sizes = [];  // array delle dimensioni per utilizzo in sass

gulp.task('elementi_grafici', function() {
	return gulp.src([ '_testatine/*.svg', '_marchi/*.svg', '_icone/*.svg', '_decorazioni/*.svg'])

    	.pipe(rename(function (path) {
	        //path.basename = path.basename.replace(/elementi_grafici_/, '');
	        //path.basename = 'icon-' + icon_name;

	        elementi_grafici_list.push(path.basename);
          current_file = path.basename;
	        return path;
	    }))
	    .pipe( replace(/viewBox="(.*?)"/i, function (match, vbox) {

  	    var viewBox = vbox.split(' ');
  	    elementi_grafici_sizes.push([current_file, +viewBox[2], +viewBox[3]]);

  	    //console.log(vbox, '->', current_file, +viewBox[2], +viewBox[3]);

  	    return(match);
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
            , { removeAttrs: { attrs: ['(fill|stroke|class|style|font-weight)'] } }
			    ]
			    //,js2svg: { pretty: true }
			};
	    }))
	    //.pipe(addsrc(['elementi_grafici/icona_da_non_minificare.svg']))
	    .pipe(svgstore())
	    //.pipe( replace(/<style>(.*?)<\/style>/g, '') )
	    //.pipe( replace(/<title>(.*?)<\/title>/g, '') )
	    //.pipe( replace(/<symbol/g, '<symbol preserveAspectRatio="xMidYMid meet"') )

	    .pipe( replace(/font-family="FuturaPT-Medium, Futura PT"/g, 'font-family="futura-pt,sans-serif" font-weight="500"') )
	    .pipe( replace(/font-family="CantoniPro-Bold, Cantoni Pro"/g, 'font-family="cantoni-pro,serif" font-weight="700"') )

/*
    	.pipe(cheerio({

        parserOptions: {
          xmlMode: true
        },

        run: function ($, file) {

          $('symbol').each( function() {
            var viewBox = $(this).attr('viewBox').split(' ');
            elementi_grafici_sizes.push([$(this).attr('id'), +viewBox[2], +viewBox[3]]);
          });

          console.log(elementi_grafici_sizes);
        }
      }))
*/

      .pipe( rename('elementi_grafici.svg') )
    	.pipe(chmod(0o755))
    	.pipe(gulp.dest('./'));
});

// il secondo argomento (['elementi_grafici']) indica una dipendenza
// in questo modo il task viene processato dopo gli altri
gulp.task('elementi_grafici_list', ['elementi_grafici'], function() {
	var str = '// lista id elementi_grafici per demo\n' +
		'// NB: questo file è generato dallo script gulpfile_elementi_grafici.js, eventuali modifiche saranno sovrascritte\n' +
		'var elementi_grafici_list = ' + JSON.stringify(elementi_grafici_list, null, " ") + ';';

	return file('elementi_grafici_list.js', str, { src: true })
    .pipe(gulp.dest('./'));
});


gulp.task('build_sizes_list', ['elementi_grafici'], function() {
	var str = '// lista dimensioni elementi svg per scss\n' +
		'// NB: questo file è generato dallo script gulpfile_elementi_grafici.js, eventuali modifiche saranno sovrascritte\n' +

		'$elementi_grafici_sizes: (';

  var last_idx = elementi_grafici_sizes.length -1;

  elementi_grafici_sizes.forEach(function (item, idx) {
    str += '\n  ' + item[0] + ': (\n' +
      '    w: ' + item[1] + 'px,\n' +
      '    h: ' + item[2] + 'px,\n' +
      '    wh_ratio: ' + (item[1] / item[2]) + '\n' +
      '  )';
    if(idx < last_idx) {
      str += ',';
    }
  });


  str += '\n);';

	return file('_elementi_grafici_sizes.scss', str, { src: true })
    .pipe(gulp.dest('./'));
});




/* 
gulp.task('svg2scss', function () {
  var intro_str = '// icone svg per inclusione nel css ADA\n' +
		  '// NB: questo file è generato dallo script gulpfile_icone.js, eventuali modifiche saranno sovrascritte\n\n';

  return gulp.src([
	  'svg_files/icone_freccia.svg',
    'svg_files/icone_ui-errore.svg',
    'svg_files/icone_ui-info.svg',
    'svg_files/icone_ui-avviso.svg',
    'svg_files/icone_ui-success.svg',
    'svg_files/icone_ui-drag.svg'
	])
  .pipe(flatmap(function(stream , file){
      var icon_name = file.path.replace(/^\/(.+\/)*(.+)\.(.+)$/, '$2').replace(/icone/, 'icona');

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
      .pipe(inject.wrap("$" + icon_name + ": '", "';"));

  })) // end flatmap
  .pipe(concat('_icone_svg.scss'))
  .pipe(inject.prepend(intro_str))
  .pipe(chmod(0o755))
  .pipe(gulp.dest('./'));

});
 */
/* 
// copia del file icone_ada_icona.svg in views/security per il suo utilizzo
// nella pagina di login
gulp.task('copy', ['icon_list'], function () {
    gulp.src('svg_files/icone_ada_icona.svg')
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
      .pipe(gulp.dest('../../../views/security/'));
});

 */

gulp.task('default', ['elementi_grafici', 'elementi_grafici_list', 'build_sizes_list']);
