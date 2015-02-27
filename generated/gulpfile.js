'use strict';

// All used modules.
var gulp = require('gulp');
var plumber = require('gulp-plumber');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var livereload = require('gulp-livereload');
var minifyCSS = require('gulp-minify-css');
var ngAnnotate = require('gulp-ng-annotate');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var jshint = require('gulp-jshint');

// Development tasks
// --------------------------------------------------------------

// Live reload business.
gulp.task('reload', function () {
    livereload.reload();
});

gulp.task('reloadCSS', function () {
    gulp.src('./public/style.css').pipe(livereload());
});

gulp.task('lintJS', function () {
    return gulp.src(['./browser/js/**/*.js', './server/**/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('buildJS', function () {
    return gulp.src(['./browser/js/app.js', './browser/js/**/*.js'])
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(concat('main.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./public'));
});

gulp.task('buildCSS', function () {
    return gulp.src('./browser/scss/main.scss')
        .pipe(plumber())
        .pipe(sass())
        .pipe(rename('style.css'))
        .pipe(gulp.dest('./public'))
});

gulp.task('default', function () {
    livereload.listen();
    gulp.watch('./server/**/*.js', ['lintJS']);
    gulp.watch('./browser/js/**', ['lintJS', 'buildJS', 'reload']);
    gulp.watch('./browser/scss/**', ['buildCSS', 'reloadCSS']);
    gulp.watch(['./browser/**/*.html', './server/app/views/*.html'], ['reload']);
});

// --------------------------------------------------------------

// Production tasks
// --------------------------------------------------------------

gulp.task('buildCSSProduction', function () {
    return gulp.src('./browser/scss/main.scss')
        .pipe(sass())
        .pipe(rename('style.css'))
        .pipe(minifyCSS())
        .pipe(gulp.dest('./public'))
});

gulp.task('buildJSProduction', function () {
    return gulp.src(['./browser/js/app.js', './browser/js/**/*.js'])
        .pipe(concat('main.js'))
        .pipe(ngAnnotate())
        .pipe(uglify())
        .pipe(gulp.dest('./public'));
});

gulp.task('buildProduction', ['buildCSSProduction', 'buildJSProduction']);

// --------------------------------------------------------------

// Build tasks
// --------------------------------------------------------------

gulp.task('build', function () {
    if (process.env.NODE_ENV === 'production') {
        gulp.start.apply(gulp, ['buildJSProduction']);
        gulp.start.apply(gulp, ['buildCSSProduction']);
    } else {
        gulp.start.apply(gulp, ['buildJS']);
        gulp.start.apply(gulp, ['buildCSS']);
    }
});

gulp.task('default', function () {
    livereload.listen();
    gulp.watch('./server/**/*.js', ['lintJS']);
    gulp.watch('./browser/js/**', ['lintJS', 'buildJS', 'reload']);
    gulp.watch('./browser/scss/**', ['buildCSS', 'reloadCSS']);
    gulp.watch(['./browser/**/*.html', './server/app/views/*.html'], ['reload']);
});