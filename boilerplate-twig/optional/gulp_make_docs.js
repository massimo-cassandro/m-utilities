/*jshint node: true */
// anche
// documentation build __file__.js -f  md -o ./__output__.md

var gulpDocumentation = require('gulp-documentation')
	,gulp = require('gulp')
	,gap = require('gulp-append-prepend')
	,replace = require('gulp-replace')
;

//https://www.npmjs.com/package/gulp-append-prepend


gulp.task('default', function () {

  return gulp.src('file_uploader.js')
    .pipe(gulpDocumentation('md', {
	    filename: 'file_uploader_DOCS.md'
    }))
    .pipe( replace(/## each\n/g, '') )
    .pipe(gap.prependFile('src/intro.md'))
    .pipe(gulp.dest('./'));
});


/*
// If you're using HTML documentation, you can specify additional 'name'
// and 'version' options
gulp.task('documentation-html-options', function () {
  return gulp.src('test.js')
    .pipe(gulpDocumentation('html', {}, {
      name: 'My Project',
      version: '1.0.0'
    }))
    .pipe(gulp.dest('html-documentation'));
});
*/
