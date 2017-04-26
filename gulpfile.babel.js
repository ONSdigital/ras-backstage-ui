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

let appRoot = './src/app';

/* ===== Clean directories ===== */
gulp.task('clean:all', () => {

    return gulp.src(['./dist/*', './aot'], { read: false })
        .pipe(rimraf());
});

gulp.task('clean:javascript', () => {

    return gulp.src(['./dist/**/*.js', './dist/**/*.js.map'], { read: false })
        .pipe(rimraf());
});

gulp.task('clean:html', () => {

    return gulp.src(['./dist/**/*.html'], { read: false })
        .pipe(rimraf());
});

gulp.task('clean:css:dev', () => {

    return gulp.src(['./dist/**/*.css', '!dist/styles.css'], { read: false })
        .pipe(rimraf());
});

gulp.task('clean:css:prod', () => {

    return gulp.src([appRoot + '/**/*.css'], { read: false })
        .pipe(rimraf());
});

gulp.task('clean:css:global', () => {

    return gulp.src(['./dist/styles.css'], { read: false })
        .pipe(rimraf());
});


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

/**
 * TODO
 * Move main- scripts out of app
 */
gulp.task('typescript', ['clean:javascript'], () => {
	return runTypscript([appRoot + '/**/*.ts', '!' + appRoot + '/main-aot.ts'], './dist', 'tsconfig.json');
});

gulp.task('typescript:prod:aot', ['aot:prod'], () => {
    return runTypscript('./aot/**/*.ts', './aot', 'tsconfig-aot.json');
});

gulp.task('typescript:prod', ['typescript:prod:aot'], () => {
    return runTypscript(appRoot + '/**/*.ts', appRoot, 'tsconfig-aot.json');
});


/* ===== HTML (dev only) ===== */
gulp.task('html', ['clean:html'], () => {

    return gulp.src([appRoot + '/**/*.html'])
        .pipe(gulp.dest('./dist'));
});


/* ===== Styles ===== */
function sassGlobal() {

    return gulp.src('./styles.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./dist'));
}

function sassNgComponents(dest) {

    return gulp.src(appRoot + '/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(dest));
}

gulp.task('sass:dev', ['clean:css:dev'], () => {
    return sassNgComponents('./dist');
});

gulp.task('sass:prod', ['clean:all'], () => {
    return sassNgComponents(appRoot);
});

gulp.task('sass:global:dev', ['clean:css:global'], () => {
    return sassGlobal();
});

gulp.task('sass:global:prod', ['clean:all'], () => {
    return sassGlobal();
});


/* ===== Watch tasks (dev only) ===== */
gulp.task('watch:typescript', ['typescript'], () => {
	gulp.watch([appRoot + "/**/*.ts", "!" + appRoot + "/main-aot.ts"], ['typescript']);
});

gulp.task('watch:html', ['html'], () => {
    gulp.watch(appRoot + '/**/*.html', ['html']);
});

gulp.task('watch:sass', ['sass:dev'], () => {
    gulp.watch(appRoot + '/**/*.scss', ['sass:dev']);
});

gulp.task('watch:sass:global', ['sass:global:dev'], () => {
    gulp.watch('./styles.scss', ['sass:global:dev']);
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
gulp.task('aot:prod', ['sass:prod'], () => {

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
gulp.task('dev', ['clean:css:prod', 'watch:typescript', 'watch:html', 'watch:sass', 'watch:sass:global', 'server:dev']);

gulp.task('prod', ['rollup:prod', 'sass:global:prod']);
