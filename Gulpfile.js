'use strict';

/*
 * Set dependencies
 */
const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const plumber = require('gulp-plumber');

/*
 * Init
 */

const { series, parallel } = require('gulp');

/*
 * Set paths
 */
// Src
const scssSrc = ['src/scss/**/*.scss', '!src/scss/**/_*.scss'];

// All
const allScss = 'src/scss/**/*.scss';

// Dist
const dist = 'public';
const cssDist = 'public/css';
/*
 * SCSS
 */
function scss() {
    return gulp
        .src(scssSrc)
        .pipe(sourcemaps.init())
        .pipe(plumber())
        .pipe(sass({ outputStyle: 'compressed' })
            .on('error', sass.logError))
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(rename({ extname: '.min.css' }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(cssDist));
}

/*
 * All
 */
function watch() {

    gulp.watch(allScss, scss);
}
/*
 * Define tasks
 */
gulp.task('scss', scss);

gulp.task('watch', gulp.series(scss, watch));

gulp.task('default', gulp.series(scss));