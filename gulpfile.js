const gulp = require('gulp');
const del = require('del');
const typescript = require('gulp-typescript');
const sourcemaps = require('gulp-sourcemaps');
const watch = require('gulp-watch');
const batch = require('gulp-batch');
const tslint = require('gulp-tslint');
var browsersync = require('browser-sync').create();


gulp.task('serve', ['compile', 'copy:libs'], function() {
  browsersync.init({
    server: {
      baseDir: ["./dist", "./"]
    }
  });
  gulp.watch("dist/**/*").on('change', browsersync.reload);
  gulp.watch("app/**/*.html").on('change', browsersync.reload);
  gulp.watch("index.html").on('change', browsersync.reload);
  gulp.watch("styles.css").on('change', browsersync.reload);
});

// clean the contents of the distribution directory
gulp.task('clean', function() {
  return del('dist/**/*');
});

// TypeScript compile
gulp.task('compile', ['clean'], function() {
  var tsProject = typescript.createProject('tsconfig.json');
  return tsProject.src()
    .pipe(sourcemaps.init())
    .pipe(typescript(tsProject))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist'));
});

// copy dependencies
gulp.task('copy:libs', ['clean'], function() {
  return gulp.src([
      'node_modules/es6-shim/es6-shim.min.js',
      'node_modules/systemjs/dist/system-polyfills.js',
      'node_modules/angular2/bundles/angular2-polyfills.js',
      'node_modules/systemjs/dist/system.src.js',
      'node_modules/rxjs/bundles/Rx.js',
      'node_modules/angular2/bundles/angular2.dev.js'
    ])
    .pipe(gulp.dest('dist/lib'));
});

gulp.task('tslint', function() {
  return gulp.src('app/**/*.ts')
    .pipe(tslint())
    .pipe(tslint.report('verbose'));
});

gulp.task('build', ['compile', 'copy:libs', 'tslint']);
gulp.task('default', ['build']);
