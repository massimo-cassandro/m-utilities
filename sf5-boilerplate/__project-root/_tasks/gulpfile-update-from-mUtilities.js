/* eslint-env node */

let gulp = require('gulp'),
  app_base_dir = '../__app-root';

gulp.task('bs4_form_theme', () => {
  return gulp.src([
    app_base_dir + '/public/assets/node_modules/symfony-bootstrap-form-theme/dist/bs4_form_layout.html.twig'
  ])
    .pipe(gulp.dest(app_base_dir + '/templates/_shared'));
});

gulp.task('layout_tools', () => {
  return gulp.src([
    app_base_dir + '/public/assets/node_modules/m-layout-tools/dist/*.*'
  ])
    .pipe(gulp.dest(app_base_dir + '/public/assets/layout-tools/'));
});


gulp.task('ckeditor', () => {
  return gulp.src([
    app_base_dir + '/public/assets/node_modules/m-utilities/ckeditor/ckeditor-dist/*.*',
    app_base_dir + '/public/assets/node_modules/m-utilities/ckeditor/ckeditor-dist/.htaccess'
  ])
    .pipe(gulp.dest(app_base_dir + '/public/assets/ckeditor/'));
});

gulp.task('contenuti', () => {
  return gulp.src([
    app_base_dir + 
    '/public/assets/node_modules/m-utilities/sf5-boilerplate/__project-root/__app-root/templates/backoffice/contenuti/*.*',
  ])
    .pipe(gulp.dest(app_base_dir + '/templates/backoffice/contenuti/'));
});



gulp.task('default',
  gulp.parallel(
    'bs4_form_theme',
    'layout_tools',
    'ckeditor',
    'contenuti'
  )
);