System.config({
    paths: {
        'npm:': 'node_modules/'
    },
    map: {
        app: 'dist'
    },
    packages: {
        app: {
            main: './main.js',
            defaultExtension: 'js'
        }
    }
});
