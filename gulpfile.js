/**
 *  Build Process
 */

'use strict';

var gulp = require('gulp');
var wrench = require('wrench');
var gutil = require('gulp-util');
var path = require('path');
var ngAnnotate = require('gulp-ng-annotate');
var uglify = require('gulp-uglify');
var filter = require('gulp-filter');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglifySaveLicense = require('uglify-save-license');

/**
 *  Common implementation for an error handler of a Gulp plugin
 */
var errorHandler = function(title) {
  'use strict';

  return function(err) {
    gutil.log(gutil.colors.red('[' + title + ']'), err.toString());
    this.emit('end');
  };
};

var paths = {
  src: ['src/jwplayer.module.js', 'src/jwplayer.service.js', 'src/jwplayer.directive.js'],
  dist: '.',
  jsFile: 'jwplayer.js',
  jsMinFile: 'jwplayer.min.js'
};

var jsFilter = filter('src/**/*.js');

gulp.task('build', function() {
  return gulp.src(paths.src)
    .pipe(ngAnnotate())
    .pipe(concat(paths.jsFile))
    .pipe(gulp.dest(paths.dist))
    .pipe(uglify({ preserveComments: uglifySaveLicense })).on('error', errorHandler('Uglify'))
    .pipe(rename(paths.jsMinFile))
    .pipe(gulp.dest(paths.dist));
});

// configure the jshint task
gulp.task('jshint', function() {
  return gulp.src(paths.src)
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

// default
gulp.task('default', ['build'], function() {
  
});
