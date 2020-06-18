/* eslint-env node */

let gulp = require('gulp'),
  project_base_dir = '../esa-2020-2';

gulp.task('bs4_form_theme', () => {
  return gulp.src([
    project_base_dir + '/public/assets/node_modules/symfony-bootstrap-form-theme/dist/bs4_form_layout.html.twig'
  ])
    .pipe(gulp.dest(project_base_dir + '/templates/_shared'));
});

gulp.task('layout_tools', () => {
  return gulp.src([
    project_base_dir + '/public/assets/node_modules/m-layout-tools/dist/*.*'
  ])
    .pipe(gulp.dest(project_base_dir + '/public/assets/layout-tools/'));
});


gulp.task('ckeditor', () => {
  return gulp.src([
    project_base_dir + '/public/assets/node_modules/m-utilities/ckeditor/ckeditor-dist/*.*',
    project_base_dir + '/public/assets/node_modules/m-utilities/ckeditor/ckeditor-dist/.htaccess'
  ])
    .pipe(gulp.dest(project_base_dir + '/public/assets/ckeditor/'));
});

gulp.task('contenuti', () => {
  return gulp.src([
    project_base_dir + '/assets/node_modules/m-utilities/contenuti/*.*',
  ])
    .pipe(gulp.dest(project_base_dir + '/templates/backoffice/contenuti/'));
});



gulp.task('default',
  gulp.parallel(
    'bs4_form_theme',
    'layout_tools',
    'ckeditor',
    'contenuti'
  )
);