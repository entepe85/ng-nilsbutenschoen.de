/*global require */
var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    imagemin = require('gulp-imagemin'),
    del = require('del'),
    ngAnnotate = require('gulp-ng-annotate');

gulp.task('vendor-scripts', function () {
    'use strict';
    return gulp.src(['_src/js/vendors/jquery-2.1.3.min.js', '_src/js/vendors/jquery-libs/*.js'])
        .pipe(concat('vendors.all.js'))
        .pipe(gulp.dest('dist/js'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
        .pipe(notify({ message: 'Vendor scripts task complete' }));
});

gulp.task('ng-scripts', function () {
    'use strict';
    return gulp.src(['_src/js/vendors/angular.min.js', '_src/js/vendors/angular-libs/*.js'])
        .pipe(concat('angular.all.js'))
        .pipe(gulp.dest('dist/js'))
        .pipe(notify({ message: 'Angular scripts task complete' }));
});

gulp.task('scripts', function () {
    'use strict';
    return gulp.src('_src/js/*.js')
        .pipe(concat('app.js'))
        .pipe(gulp.dest('dist/js'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
        .pipe(notify({ message: 'Scripts task complete' }));
});

gulp.task('images', function () {
    'use strict';
    return gulp.src([
        'img/*',
        'assets/img/*'
    ])
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images'));
});

gulp.task('watch', function () {
    'use strict';
    gulp.watch('_src/js/*.js', ['scripts']);
});

gulp.task('default', function () {
    'use strict';
    gulp.start('vendor-scripts', 'ng-scripts', 'scripts');
});
