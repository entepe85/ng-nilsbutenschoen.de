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
    less = require('gulp-less'),
    minifyCSS = require('gulp-minify-css'),
    combiner = require('stream-combiner2'),
    livereload = require('gulp-livereload');

var paths = {
    styles: {
        master: '_src/less/main.less',
        watch: ['_src/less/**/*.less', '_src/less/main.less'],
        dist: 'dist/css/main.css'
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
    }
};

gulp.task('vendor-scripts', function () {
    'use strict';
    return gulp.src(paths.scripts.jquery)
        .pipe(concat('vendors.all.js'))
        .pipe(gulp.dest(paths.scripts.dist))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest(paths.scripts.dist))
        .pipe(notify({ message: 'Vendor scripts task complete' }));
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
        .pipe(livereload())
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

gulp.task('less', function () {
    'use strict';
    var combined = combiner.obj([
        gulp.src(paths.styles.master),
        less(),
        minifyCSS(),
        gulp.dest(paths.styles.dist),
        notify({ message: 'LESS compiled & minified, sir!'}),
        livereload()
    ]);
    combined.on('error', console.error.bind(console));
});

gulp.task('watch', function () {
    'use strict';
    livereload.listen();
    gulp.watch(paths.scripts.watch, ['scripts']);
    gulp.watch(paths.styles.watch, ['less']);
});

gulp.task('clean', function (cb) {
    'use strict';
    del(['dist/images', 'dist/js', 'dist/css'], cb);
});

gulp.task('default', ['clean'], function () {
    'use strict';
    gulp.start('vendor-scripts', 'ng-scripts', 'scripts', 'images', 'less');
});
