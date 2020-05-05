/* eslint-env node */

var gulp = require('gulp'),
  node_dir = '../AppBundle/Resources/public/node_modules',
  dest_assets_dir = '../AppBundle/Resources/public';

gulp.task('bs4_form_theme', () => {
  return gulp.src([
    node_dir + '/symfony-bootstrap-form-theme/dist/bs4_form_layout.html.twig'
  ])
    .pipe(gulp.dest('../AppBundle/Resources/views/_form/'));
});

gulp.task('layout_tools', () => {
  return gulp.src([
    node_dir + '/m-layout-tools/dist/*.*'
  ])
    .pipe(gulp.dest(dest_assets_dir + '/layout-tools'));
});


gulp.task('ckeditor', () => {
  return gulp.src([
    node_dir + '/m-utilities/ckeditor/ckeditor-dist/*.*',
    node_dir + '/m-utilities/ckeditor/ckeditor-dist/.htaccess'
  ])
    .pipe(gulp.dest(dest_assets_dir + '/ckeditor'));
});


gulp.task('default',
  gulp.parallel(
    'bs4_form_theme',
    'layout_tools',
    'ckeditor'  
  )
);