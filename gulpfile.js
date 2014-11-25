var gulp = require('gulp');
var connect = require('gulp-connect');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var sourcemaps = require('gulp-sourcemaps');
var ghPages = require('gulp-gh-pages');
var _ = require('underscore');

gulp.task('browserify', function() {
  var bundler = browserify('./src/index.coffee', {
    basedir: __dirname,
    debug: true
  });

  return bundler.bundle()
    .pipe(source('bundle.js')) // gives streaming vinyl file object
    .pipe(buffer()) // convert from streaming to buffered vinyl file object
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./dist/js/'));
});

gulp.task('watch', function() {
  var watcher = gulp.watch('./src/**/*.coffee', ['browserify']);
  watcher.on('change', function(event) {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
  });
});

gulp.task('gh-pages', function() {
  return gulp.src('./dist/**/*')
    .pipe(ghPages());
});

gulp.task('connect', function() {
  connect.server({
    root: './dist',
    livereload: true
  });
});

gulp.task('deploy', ['browserify', 'gh-pages']);
gulp.task('default', ['browserify', 'connect', 'watch']);
