/* eslint-disable strict */

const gulp = require('gulp');
const sass = require('gulp-sass');
const cssnano = require('gulp-cssnano');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const rename = require('gulp-rename');

// The css command that compiles the scss to css and moves it to dist.
gulp.task('css', function () {
  return gulp
    .src('./src/style/*.scss')
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(cssnano())
    .on('error', sass.logError)
    .pipe(gulp.dest('./dist/style/'));
});

// The js command that runs the src js through babel and move it to dist.
gulp.task('js', function () {
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
    .pipe(gulp.dest('./dist/js'));
});

// The watch command, that watches scss and js files for changes.
// It then runs the lint and compile commands.
gulp.task('watch', function () {
  gulp.watch(['./src/style/**/*.scss', './src/js/**/*.js'],
    gulp.parallel('lint-scss', 'lint-js', 'js', 'css'));
});

//Lint scss.
gulp.task('lint-scss', function lintCssTask() {
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
});

// Lint js.
gulp.task('lint-js', function lintJsTask() {
  const eslint = require('gulp-eslint');

  return gulp
    .src('src/**/*.js')
    .pipe(eslint())
    .pipe(eslint.format());
});

// The build command lints scss, lints js, compile js, compiles css.
gulp.task('build', gulp.parallel('lint-scss', 'lint-js', 'js', 'css'));
