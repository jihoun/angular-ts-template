/*eslint-env node */

var gulp = require('gulp');
var tslint = require('gulp-tslint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var ngAnnotate = require('gulp-ng-annotate');
var htmlmin = require('gulp-htmlmin');
// var babel = require('gulp-babel');
var jsonminify = require('gulp-jsonminify');
var imagemin = require('gulp-imagemin');
var order = require('gulp-order');
var typescript = require('gulp-typescript');
var browserSync = require('browser-sync').create();

var jsLoadOrder = [
    '**/*.module.js',
    '**/*.js'
];

gulp.task('default',
    [
        'lint',
        'scripts',
        'html',
        'style',
        'fonts',
        'scripts-vendor',
        'manifest',
        'images',
        'serve'
    ],
    function () {
        gulp.watch('app/ts/**/*.ts', ['lint', 'scripts']);
        gulp.watch('app/**/*.html', ['html']);
        gulp.watch('app/manifest.json', ['manifest']);
        gulp.watch('app/images/**/*.*', ['images']);
    });

gulp.task('dist', [
    'html-dist',
    'lint',
    'scripts-dist',
    'scripts-vendor',
    'style',
    'fonts',
    'manifest',
    'images'
]);

gulp.task('scripts', function () {
    var tsProject = typescript.createProject('tsconfig.json');

    gulp.src(['typings/**/*.ts', 'app/ts/**/*.ts'])
        .pipe(tsProject())
        .pipe(order(jsLoadOrder))
        .pipe(concat('all.js'))
        .pipe(gulp.dest('dist/js'));
});

gulp.task('scripts-dist', function () {
    var tsProject = typescript.createProject('tsconfig.json');

    gulp.src('app/ts/**/*.ts')
        // .pipe(babel({ presets: ['es2015'] }))
        .pipe(tsProject())
        .pipe(ngAnnotate())
        .pipe(uglify())
        .pipe(order(jsLoadOrder))
        .pipe(concat('all.js'))
        .pipe(gulp.dest('dist/js'));
});

gulp.task('scripts-vendor', function () {
    gulp.src([
        'node_modules/angular/angular.min.js',
        'node_modules/angular-route/angular-route.min.js'
    ])
        .pipe(concat('vendor.js'))
        // .pipe(babel({ presets: ['es2015'] }))
        .pipe(ngAnnotate())
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

gulp.task('html', function () {
    gulp.src('app/**/*.html')
        .pipe(gulp.dest('dist/'));
});

gulp.task('html-dist', function () {
    var options = { collapseWhitespace: true, removeComments: true, caseSensitive: true };
    gulp.src('app/**/*.html')
        .pipe(htmlmin(options))
        .pipe(gulp.dest('dist/'));
});

gulp.task('lint', function () {
    return gulp.src([
        'app/ts/**/*.ts'
    ])
        .pipe(tslint())
        .pipe(tslint.report());
});

gulp.task('style', function () {
    gulp.src([
    ])
        .pipe(concat('vendor.css'))
        .pipe(gulp.dest('dist/css'));
});

gulp.task('fonts', function () {
    gulp.src('node_modules/**/*.{eot,svg,ttf,woff,woff2,otf}')
        .pipe(gulp.dest('dist/fonts/'));
});

gulp.task('manifest', function () {
    gulp.src('app/manifest.json')
        .pipe(jsonminify())
        .pipe(gulp.dest('dist/'));
});

gulp.task('images', function () {
    gulp.src('app/images/**/*.*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images'));
});

gulp.task('serve', function(){
    browserSync.init({
        server: "./dist"
    });
    browserSync.stream();
});
