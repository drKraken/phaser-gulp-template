var gulp = require('gulp');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
var prefix = require('gulp-autoprefixer');
var cssmin = require('gulp-csso');
var sass = require('gulp-ruby-sass');
var htmlmin = require('gulp-minify-html');
var imagemin = require('gulp-imagemin');
var browserSync = require('browser-sync');
var stylish = require('jshint-stylish');
var concat = require('gulp-concat');


/**
 * use production variable for serve files from build folder
 */

var env,
    outputDir,
    sassStyle;

env = 'development';

if (env === 'development') {
    outputDir = 'src/';
    sassStyle = 'expanded';
} else {
    outputDir = 'bin/';
    sassStyle = 'compressed';
}

/**
 *  Conpiling sass and autoprefixing
 */

gulp.task('sass', function() {
    gulp.src('src/sass/**/*.scss')
        .pipe(sass({
            style: 'expanded'
        }))
        .pipe(prefix('last 2 version'))
        .pipe(gulp.dest('src/css/'));
});

/**
 * Move assets in build folder and compress images
 */

gulp.task('move', function() {
    return gulp.src('src/assets/images/**/*.*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{
                removeViewBox: false
            }]
        }))
        .pipe(gulp.dest('bin/assets/images'));
});

/**
 * Minify js files
 */

gulp.task('uglify', function() {
    return gulp.src('src/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('bin/js/'));
});

/**
 * Move libraries in bin
 */

gulp.task('move-libs', function() {
    console.log('Moving library files in bin folder');
    return gulp.src('src/lib/**.*')
            .pipe(gulp.dest('bin/lib'));
});

/**
 * Using jshint to error searching
 */

gulp.task('js', function() {
    return gulp.src('src/js/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter(stylish));

});

/**
 * Minify css files
 */

gulp.task('cssmin', function() {
    return gulp.src('src/css/**/*.css')
        .pipe(cssmin())
        .pipe(gulp.dest('bin/css'));
});

/**
 * Minify html files
 */

gulp.task('htmlmin', function() {
    return gulp.src('src/*.html')
        .pipe(htmlmin())
        .pipe(gulp.dest('bin/'));
});

/**
 * add node server and live reloading via BrowserSync.
 * Can be used for sync testing is a lot of browsers
 */

gulp.task('browser', function() {
    browserSync.init(['src/css/**/*.css', 'src/*.html', 'src/js/**/*.js'], {
        server: {
            baseDir: outputDir
        }
    });
});

/**
 * watch file changes and run sass comand for @scss and @js for js files
 */

gulp.task('watch', function() {
    gulp.watch('src/sass/*.scss', ['sass']);
    gulp.watch('src/js/**/*.js', ['js']);

});

/**
 * concat js games files
 */

gulp.task('concat', function() {
    gulp.src('src/js/**/*.js')
        .pipe(concat('game.js'))
        .pipe(gulp.dest('bin/js/'));
});

/**
 * build tasks. simply run @gulp command or @gulp build for building production version
 */

gulp.task('build', ['sass', 'js', 'htmlmin', 'cssmin', 'uglify', 'concat', 'move-libs', 'move']);
gulp.task('default', ['sass', 'js', 'watch', 'browser']);
