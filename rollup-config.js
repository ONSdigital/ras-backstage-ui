//import rollup      from 'rollup'
import nodeResolve from 'rollup-plugin-node-resolve'
import commonjs    from 'rollup-plugin-commonjs';
import uglify      from 'rollup-plugin-uglify'
import replace     from 'rollup-plugin-replace';

export default {
    entry: 'src/app/main-aot.js',
    dest: 'dist/build.js', // output a single application bundle
    sourceMap: false,
    format: 'iife',
    onwarn: function(warning) {
        // Skip certain warnings

        // should intercept ... but doesn't in some rollup versions
        if ( warning.code === 'THIS_IS_UNDEFINED' ) { return; }
        // intercepts in some rollup versions
        if ( warning.indexOf && warning.indexOf("The 'this' keyword is equivalent to 'undefined'") > -1 ) { return; }

        // console.warn everything else
        console.warn( warning.message );
    },
    plugins: [
        nodeResolve({
            jsnext: true,
            module: true
        }),
        commonjs({
            include: [
                'node_modules/rxjs/**',
                'node_modules/@angular-redux/**'
            ]
        }),
        replace({
            'process.env.NODE_ENV': JSON.stringify( 'production' )
        }),
        uglify()
    ]
}
