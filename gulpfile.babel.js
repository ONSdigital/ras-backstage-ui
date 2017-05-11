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
import replace from 'replace-in-file';

const paths = {
    appRoot: './src/app',
    dist: './dist',
};

/* ===== Clean directories ===== */
gulp.task('clean:all', () => {

    return gulp.src([paths.dist + '/*', './aot'], { read: false })
        .pipe(rimraf());
});

gulp.task('clean:javascript', () => {

    return gulp.src([paths.dist + '/**/*.js', paths.dist + '/**/*.js.map'], { read: false })
        .pipe(rimraf());
});

gulp.task('clean:html', () => {

    return gulp.src([paths.dist + '/**/*.html'], { read: false })
        .pipe(rimraf());
});

gulp.task('clean:css:dev', () => {

    return gulp.src([paths.dist + '/**/*.css', '!dist/styles.css'], { read: false })
        .pipe(rimraf());
});

gulp.task('clean:css:prod', () => {

    return gulp.src([paths.appRoot + '/**/*.css'], { read: false })
        .pipe(rimraf());
});

gulp.task('clean:css:global', () => {

    return gulp.src([paths.dist + '/styles.css'], { read: false })
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
	return runTypscript([paths.appRoot + '/**/*.ts', '!' + paths.appRoot + '/main-aot.ts'], paths.dist, 'tsconfig.json');
});

gulp.task('typescript:prod:aot', ['aot:prod'], () => {
    return runTypscript('./aot/**/*.ts', './aot', 'tsconfig-aot.json');
});

gulp.task('typescript:prod', ['typescript:prod:aot'], () => {
    return runTypscript(paths.appRoot + '/**/*.ts', paths.appRoot, 'tsconfig-aot.json');
});


/* ===== HTML (dev only) ===== */
gulp.task('html', ['clean:html'], () => {

    return gulp.src([paths.appRoot + '/**/*.html'])
        .pipe(gulp.dest(paths.dist));
});


/* ===== Styles ===== */
function sassGlobal() {

    return gulp.src('./styles.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(paths.dist));
}

function sassNgComponents(dest) {

    return gulp.src(paths.appRoot + '/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(dest));
}

gulp.task('sass:dev', ['clean:css:dev'], () => {
    return sassNgComponents(paths.dist);
});

gulp.task('sass:prod', ['clean:all'], () => {
    return sassNgComponents(paths.appRoot);
});

gulp.task('sass:global:dev', ['clean:css:global'], () => {
    return sassGlobal();
});

gulp.task('sass:global:prod', ['clean:all'], () => {
    return sassGlobal();
});


/* ===== Watch tasks (dev only) ===== */
gulp.task('watch:typescript', ['typescript'], () => {
	gulp.watch([paths.appRoot + "/**/*.ts", "!" + paths.appRoot + "/main-aot.ts"], ['typescript']);
});

gulp.task('watch:html', ['html'], () => {
    gulp.watch(paths.appRoot + '/**/*.html', ['html']);
});

gulp.task('watch:sass', ['sass:dev'], () => {
    gulp.watch(paths.appRoot + '/**/*.scss', ['sass:dev']);
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
        .pipe(gulp.dest(paths.dist));

});

// Task to remove all the data-test=\".....\" HTML attributes from the code in the dist folder
gulp.task('remove-test-tags', (callback) => {

    const removeTags = {

        files: [
            paths.dist + '/**/*.js'
        ],

        // Replacement to make
        from: /\s(attr.)?data-test=\\".*?\\"/g,
        to: ''
    };

    try {
        let changedFiles = replace.sync(removeTags);
    } catch (error) {
        console.error('Error occurred:', error);
    }
});


/* ===== Tools ===== */
gulp.task('dev', ['clean:css:prod', 'watch:typescript', 'watch:html', 'watch:sass', 'watch:sass:global', 'server:dev']);

gulp.task('prod', ['rollup:prod', 'sass:global:prod']);
