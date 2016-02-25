const gulp = require('gulp');
const del = require('del');
const typescript = require('gulp-typescript');
const sourcemaps = require('gulp-sourcemaps');


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

gulp.task('build', ['compile']);
gulp.task('default', ['build']);
