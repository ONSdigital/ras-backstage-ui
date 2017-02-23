import gulp from 'gulp';
import typescript from 'gulp-typescript';
import sourcemaps from 'gulp-sourcemaps';
import rimraf from 'gulp-rimraf';
import { server as liteServer } from 'lite-server';
import sass from 'gulp-sass';
import shell from 'gulp-shell';
import rollup from 'rollup-stream';
import source from 'vinyl-source-stream';

import rollupConfig from './rollup-config';

/* ===== Clean directories ===== */
gulp.task('clean:all', () => {

    return gulp.src(['./dist/*', './aot'], { read: false })
        .pipe(rimraf());
});

/*
gulp.task('clean:javascript', () => {

    return gulp.src(['./dist/!**!/!*.js', './dist/!**!/!*.js.map'], { read: false })
        .pipe(rimraf());
});
*/


/* ===== Typescript ===== */
function runTypscript(src, dest, tsconfig) {

    let tsProject = typescript.createProject(tsconfig);

    let tsResult = gulp.src(src)
        .pipe(sourcemaps.init())
        .pipe(tsProject());

    return tsResult.js
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest(dest));
}

gulp.task('typescript', ['clean:all'], () => {
	return runTypscript('./app/**/*.ts', './dist', 'tsconfig.json');
});

gulp.task('typescript:prod:aot', ['aot:prod'], () => {
    return runTypscript('./aot/**/*.ts', './aot', 'tsconfig-aot.json');
});

gulp.task('typescript:prod', ['typescript:prod:aot'], () => {
    return runTypscript('./app/**/*.ts', './app', 'tsconfig-aot.json');
});


/* ===== HTML ===== */
gulp.task('html', ['clean:all'], () => {

    return gulp.src(['./app/**/*.html'])
        .pipe(gulp.dest('./dist'));
});


/* ===== Styles ===== */
gulp.task('sass', ['clean:all'], () => {

    return gulp.src('./app/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./dist'));
});

gulp.task('sass:global', ['clean:all'], () => {

    return gulp.src('./styles.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./dist'));

});

//gulp.task('sass:global:prod', ['clean:all', 'sass:global']);


/* ===== Watch tasks ===== */
gulp.task('watch:typescript', ['typescript'], () => {
	gulp.watch("./app/**/*.ts", ['typescript']);
});

gulp.task('watch:html', ['html'], () => {
    gulp.watch('./app/**/*.html', ['html']);
});

gulp.task('watch:sass', ['sass'], () => {
    gulp.watch('./app/**/*.scss', ['sass']);
});

gulp.task('watch:sass:global', ['sass:global'], () => {
    gulp.watch('./styles.scss', ['sass:global']);
});


/* ===== Server ===== */
function startServer(configPath) {

    /* Forge argv arguments for lite-server to work with Gulp task */
    liteServer({
        argv: [
            null,
            null,
            '--config',
            configPath
        ]
    });
}

gulp.task('server:dev', ['typescript'], () => {
    startServer('./bs-config-dev.js');
});

gulp.task('server:prod', () => {
    startServer('./bs-config-prod.js');
});


/* ===== Minification/Uglification ===== */
gulp.task('aot:prod', ['clean:all'], () => {

    /* Workaround for aot to work with gulp */
    return gulp.src('./gulpfile.babel.js', {read: false})
        .pipe(shell('"node_modules/.bin/ngc" -p tsconfig-aot.json', {
            ignoreErrors: true
        }));
});

gulp.task('rollup:prod', ['typescript:prod'], () => {

    return rollup(rollupConfig)
        .pipe(source('build.js'))
        .pipe(gulp.dest('./dist'));

});


/* ===== Tools ===== */
gulp.task('dev', ['watch:typescript', 'watch:html', 'watch:sass', 'watch:sass:global', 'server:dev']);

gulp.task('prod', ['rollup:prod', 'sass:global']);
