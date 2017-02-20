let gulp = require('gulp'),
    typescript = require('gulp-typescript'),
    sass = require('gulp-sass'),
    babel = require('gulp-babel'),
    sourcemaps = require("gulp-sourcemaps"),
    liteServer = require('lite-server');

gulp.task('typescript', () => {

    let tsProject = typescript.createProject("tsconfig.json");

    let tsResult = gulp.src("./app/**/*.ts")
        .pipe(sourcemaps.init())
        .pipe(tsProject());

    return tsResult.js
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest('./dist'));

});

gulp.task('sass', function () {

    return gulp.src('./app/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./dist'));

});

gulp.task('html', function () {

    return gulp.src('./app/**/*.html')
        .pipe(gulp.dest('./dist'));

});

gulp.task('watch:typescript', ['typescript'],  function () {

    gulp.watch("./app/**/*.ts", ['typescript']);

});

gulp.task('watch:sass', ['sass'], function () {

    gulp.watch('./app/**/*.scss', ['sass']);

});

gulp.task('watch:html', ['html'], function () {

    gulp.watch('./app/**/*.html', ['html']);

});

gulp.task('dev', ['watch:typescript', 'watch:sass', 'watch:html'], function () {
    liteServer.server();
});
