import gulp from 'gulp';
import typescript from 'gulp-typescript';
import sourcemaps from 'gulp-sourcemaps';
import rimraf from 'gulp-rimraf';
import { server as liteServer } from 'lite-server';
import sass from 'gulp-sass';

gulp.task('clean:javascript', () => {

    gulp.src(['./dist/**/*.js', './dist/**/*.js.map'], { read: false })
        .pipe(rimraf());

});

gulp.task('typescript', ['clean:javascript'], () => {

	let tsProject = typescript.createProject("tsconfig.json");

	let tsResult = gulp.src("./app/**/*.ts")
		.pipe(sourcemaps.init())
		.pipe(tsProject());

	return tsResult.js
		.pipe(sourcemaps.write("."))
		.pipe(gulp.dest('./dist'));

});

gulp.task('html', function () {

    return gulp.src('./app/**/*.html')
        .pipe(gulp.dest('./dist'));

});

gulp.task('sass', function () {

    return gulp.src('./app/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./dist'));

});

gulp.task('sass:global', function () {

    return gulp.src('./styles.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./dist'));

});

gulp.task('watch:typescript', ['typescript'],  function () {

	gulp.watch("./app/**/*.ts", ['typescript']);

});

gulp.task('watch:html', ['html'], function () {

    gulp.watch('./app/**/*.html', ['html']);

});

gulp.task('watch:sass', ['sass'], function () {

    gulp.watch('./app/**/*.scss', ['sass']);

});

gulp.task('watch:sass:global', ['sass:global'], function () {

    gulp.watch('./styles.scss', ['sass:global']);

});

gulp.task('dev', ['watch:typescript', 'watch:html', 'watch:sass', 'watch:sass:global'], () => {
    liteServer();
});
