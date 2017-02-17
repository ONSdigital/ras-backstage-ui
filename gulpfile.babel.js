import gulp from 'gulp';
import typescript from 'gulp-typescript';
import sourcemaps from 'gulp-sourcemaps';
import rimraf from 'gulp-rimraf';

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

gulp.task('watch:typescript', ['typescript'],  function () {

	gulp.watch("./app/**/*.ts", ['typescript']);

});

gulp.task('dev', ['watch:typescript'], () => {

});
