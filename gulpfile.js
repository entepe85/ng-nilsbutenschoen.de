/*global require, console */
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
    minifyCSS = require('gulp-minify-css'),
    combiner = require('stream-combiner2'),
    livereload = require('gulp-livereload'),
    sass = require('gulp-sass'),
    gutil = require('gulp-util'),
    sourcemaps = require('gulp-sourcemaps'),
    plumber = require('gulp-plumber'),
    browserSync = require('browser-sync');

var paths = {
    styles: {
        master: '_src/scss/main.scss',
        watch: ['_src/scss/**/*.scss', '_src/less/main.scss'],
        dist: 'dist/css'
    },
    scripts: {
        jquery: ['_src/js/vendors/jquery-2.1.3.min.js', '_src/js/vendors/jquery-libs/*.js'],
        angular: ['_src/js/vendors/angular.min.js', '_src/js/vendors/angular-libs/*.js'],
        app: '_src/js/*.js',
        watch: '_src/js/*.js',
        dist: 'dist/js'
    },
    images: {
        src: ['_src/img/*', '_src/assets/img/*'],
        dist: 'dist/images'
    },
    vhost: 'nilsbutenschoen.dev'
};

gulp.task('vendor-scripts', function () {
    'use strict';
    return gulp.src(paths.scripts.jquery)
        .pipe(concat('vendors.all.js'))
        .pipe(gulp.dest(paths.scripts.dist))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest(paths.scripts.dist))
        .pipe(notify('Vendor scripts task complete'));
});

gulp.task('ng-scripts', function () {
    'use strict';
    return gulp.src(paths.scripts.angular)
        .pipe(concat('angular.all.js'))
        .pipe(gulp.dest(paths.scripts.dist))
        .pipe(notify({ message: 'Angular scripts task complete' }));
});

gulp.task('scripts', function () {
    'use strict';
    return gulp.src(paths.scripts.app)
        .pipe(concat('app.js'))
        .pipe(gulp.dest(paths.scripts.dist))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest(paths.scripts.dist))
        .pipe(notify({ message: 'Scripts task complete' }));
});

gulp.task('images', function () {
    'use strict';
    return gulp.src(paths.images.src)
        .pipe(cache(imagemin({
            use: [pngquant()],
            optimizationLevel: 5,
            progressive: true,
            interlaced: true
        })))
        .pipe(gulp.dest(paths.images.dist));
});

gulp.task('sass', function () {
    'use strict';
    gulp.src(paths.styles.master)
        .pipe(sourcemaps.init())
        .pipe(plumber())
        .pipe(sass())
        .on('error', function (err) {
            gutil.log(err);
            this.emit('end');
        })
        .pipe(sourcemaps.write('../sourcemaps', {
            includeContent: false // Otherwise all the CSS would be included
        }))
        .pipe(gulp.dest(paths.styles.dist))
        .pipe(browserSync.stream({match: "**/*.css"}))
        .pipe(rename({suffix: '.min'}))
        .pipe(minifyCSS({keepBreaks: false}))
        .pipe(gulp.dest(paths.styles.dist))
        .on('error', gutil.log)
        .pipe(notify({ message: 'SCSS compiled & minified, sir!'}));
});

gulp.task('browsersync', function () {
    'use strict';
    browserSync({
        proxy: paths.vhost
    });
});

gulp.task('watch', ['browsersync'], function () {
    'use strict';
    gulp.watch(paths.scripts.watch, ['scripts']);
    gulp.watch(paths.styles.watch, ['sass']);
});

gulp.task('clean', function (cb) {
    'use strict';
    del(['dist/images', 'dist/js', 'dist/css'], cb);
});

gulp.task('default', ['clean'], function () {
    'use strict';
    gulp.start('vendor-scripts', 'ng-scripts', 'scripts', 'images', 'sass');
});
