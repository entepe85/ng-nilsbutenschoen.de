/*global require */
var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    imagemin = require('gulp-imagemin'),
    del = require('del'),
    ngAnnotate = require('gulp-ng-annotate'),
    cache = require('gulp-cache'),
    pngquant = require('imagemin-pngquant'),
    less = require('gulp-less'),
    minifyCSS = require('gulp-minify-css');

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
        '_src/img/*',
        '_src/assets/img/*'
    ])
        .pipe(cache(imagemin({
            use: [pngquant()],
            optimizationLevel: 5,
            progressive: true,
            interlaced: true
        })))
        .pipe(gulp.dest('dist/images'));
});

gulp.task('less', function () {
    'use strict';
    return gulp.src('_src/less/main.less')
        .pipe(less())
        .pipe(minifyCSS())
        .pipe(gulp.dest('dist/css'))
        .pipe(notify({ message: 'LESS compiled & minified, sir!'}));
});

gulp.task('watch', function () {
    'use strict';
    gulp.watch('_src/js/*.js', ['scripts']);
    gulp.watch(['_src/less/**/*.less', '_src/less/main.less'], ['less']);
});

gulp.task('clean', function (cb) {
    'use strict';
    del(['dist/images', 'dist/js', 'dist/css'], cb);
});

gulp.task('default', ['clean'], function () {
    'use strict';
    gulp.start('vendor-scripts', 'ng-scripts', 'scripts', 'images', 'less');
});
