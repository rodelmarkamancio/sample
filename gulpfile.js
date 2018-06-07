var gulp = require('gulp-help')(require('gulp')),
    gutil = require('gulp-util'),
    plumber = require('gulp-plumber'),
    notify = require('gulp-notify'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    minify = require('gulp-minify-css'),
    sh = require('shelljs'),
    fs = require('fs'),
    path = require('path'),
    _ = require('lodash'),
    runSequence = require('run-sequence');

var resources = {
    "frontend": {
        "js": [
            'node_modules/jquery/dist/jquery.min.js',
            // 'node_modules/bootstrap/dist/js/bootstrap.min.js',
            'node_modules/jquery-modal/jquery.modal.min.js'
        ],
        "css": {
            "src": "assets/scss/app.scss"
        },
        "images": [
            "assets/images/*.*",
            "assets/images/*/**.*"
        ],
        "fonts": [
            "assets/fonts/*.*"
        ]
    }
};

var paths = {
    "app": "assets/",
    "sassPath": "assets/scss/"
};

//
// Cleaning
//
gulp.task('clean:app', 'Clean public app folders', function() {
    sh.rm('-rf', paths.app);
    sh.mkdir('-p', paths.app);
    sh.mkdir('-p', path.join(paths.app, 'css'));
    sh.mkdir('-p', path.join(paths.app, 'js'));
    sh.mkdir('-p', path.join(paths.app, 'images'));
    sh.mkdir('-p', path.join(paths.app, 'fonts'));
});

//
// Build
//
var timestamp = new Date().getTime();

// gulp.task('build:app', 'Build the website app in dev mode', function(callback) {
//     runSequence('clean:app', [
//         'build:js',
//         'css',
//         // 'build:fonts',
//         // 'build:images'
//     ], callback);
// });

gulp.task('build:js', false, function() {
    return gulp.src(resources.frontend.js)
        .pipe(plumber({ errorHandler: notify.onError("Error: <%= error.message %>") }))
        .pipe(sourcemaps.init())
        .pipe(concat('app.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(path.join(paths.app, 'js')))
        .pipe(notify({ message: 'App javascript successfully builded!', onLast: true }));
});

gulp.task('build:css', false, function() {
    return gulp.src(resources.frontend.css.src)
        .pipe(plumber({ errorHandler: notify.onError("Error: <%= error.message %>") }))
        .pipe(sourcemaps.init())
        // .pipe(sass({ includePaths: resources.frontend.css.includes }))
        .pipe(minify())
        .pipe(autoprefixer())
        .pipe(concat('metsec.css'))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(path.join(paths.app, 'css')))
        .pipe(notify({ message: 'App stylesheets successfully builded!', onLast: true }));
});

gulp.task('build:fonts', false, function() {
    return gulp.src(resources.frontend.fonts)
        .pipe(gulp.dest(path.join(paths.app, 'fonts')))
        .pipe(notify({ message: 'App fonts successfully builded!', onLast: true }));
});

gulp.task('build:images', false, function() {
    return gulp.src(resources.frontend.images)
        .pipe(gulp.dest(path.join(paths.app, 'images')))
        .pipe(notify({ message: 'App images successfully builded!', onLast: true }));
});

gulp.task('css', function() {
    return gulp.src(paths.sassPath + '/app.scss')
        .pipe(sass({
                style: 'compressed',
                loadPath: [
                    './assets/scss',
                ]
            })
            .on("error", notify.onError(function(error) {
                return "Error: " + error.message;
            })))
        .pipe(minify())
        .pipe(concat('metsec.css'))
        .pipe(gulp.dest(path.join(paths.app, 'css')));
});

// Rerun the task when a file changes
gulp.task('watch', function() {
    gulp.watch(paths.sassPath + '/**/**.scss', ['css']);
    // gulp.watch(resources.frontend.js, ['build:frontend:js:dev']);
});