/* eslint-disable strict */

const gulp = require('gulp');
const sass = require('gulp-sass');
const cssnano = require('gulp-cssnano');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const rename = require('gulp-rename');
const imagemin = require('gulp-imagemin');
var browserSync = require('browser-sync').create();


/**
 * Runs the css compile task
 * @returns {object} Linter is run.
 */
function css() {
  return gulp
    .src('./src/style/*.scss')
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(cssnano())
    .on('error', sass.logError)
    .pipe(gulp.dest('./dist/style/'))
    .pipe(browserSync.stream());
}

/**
 * Runs the css compile task
 * @returns {object} Linter is run.
 */
function js() {
  return gulp
    .src(['./src/js/*.js'], { base: './' })
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(
      rename(function (path) {
        path.dirname = '';
        return path;
      })
    )
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./dist/js'))
    .pipe(browserSync.stream());
}

/**
 * Runs the watch compile task
 * @returns {object} run tasks when changed.
 */
function watchFiles() {
  browserSync.init({
    server: {
      baseDir: './dist/'
    }
  });
  gulp.watch(['./src/style/**/*.scss', './src/js/**/*.js'],
    gulp.parallel(lintScss, lintJs, js, css));


  gulp.watch('./dist/**/*.html').on('change', browserSync.reload);
  gulp.watch('./dist/*.html').on('change', browserSync.reload);
}

/**
 * Runs the css lint task
 * @returns {object} Linter is run.
 */
function lintScss() {
  const gulpStylelint = require('gulp-stylelint');

  return gulp
    .src('src/**/*.scss')
    .pipe(
      gulpStylelint({
        reporters: [
          {
            formatter: 'string',
            console: true
          }
        ]
      })
    );
}

/**
 * Runs the js lint task
 * @returns {object} Linter is run.
 */
function lintJs() {
  const eslint = require('gulp-eslint');

  return gulp
    .src('src/**/*.js')
    .pipe(eslint())
    .pipe(eslint.format());
}

/**
 * Runs the image optimization task
 * @returns {object} The images are moved to dist.
 */
function minImageTask() {
  return gulp
    .src('src/img/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/img'));
}

// The build command lints scss, lints js, compile js, compiles css.
const build = gulp.parallel(lintScss, lintJs, js, css, minImageTask);

exports.build = build;
exports.watchFiles = watchFiles;
exports.js = js;
exports.css = css;
exports.lintScss = lintScss;
exports.lintJs = lintJs;
exports.images = minImageTask;