System.config({
    paths: {
      // paths serve as alias
      'npm:': 'node_modules/'
    },
    // map tells the System loader where to look for things
    map: {
      // our src is within the src folder
      app: 'dist',

      // angular bundles
      '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
      '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
      '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
      '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
      '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
      '@angular/http': 'npm:@angular/http/bundles/http.umd.js',
      '@angular/router': 'npm:@angular/router/bundles/router.umd.js',
      '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',

      '@angular-redux/core':       'npm:@angular-redux/core',
      '@angular-redux/router':     'npm:@angular-redux/router',
      '@angular-redux/store':      'npm:@angular-redux/store',

      // other libraries
      'lodash':                    'npm:lodash',
      'symbol-observable':         'npm:symbol-observable',
      'redux':                     'npm:redux',
      'ng2-redux':                 'npm:ng2-redux/lib',
      'ng2-redux-router':          'npm:ng2-redux-router/lib/es5',
      'redux-logger':              'npm:redux-logger',
      'rxjs':                      'npm:rxjs',
      'angular-in-memory-web-api': 'npm:angular-in-memory-web-api/bundles/in-memory-web-api.umd.js',

      'jquery':                    'https://code.jquery.com/jquery-2.1.4.js'
    },
    // packages tells the System loader how to load when no filename and/or no extension
    packages: {
      app: {
        main: './main.js',
        defaultExtension: 'js'
      },
      lodash: {
        defaultExtension: 'js'
      },
      rxjs: {
        defaultExtension: 'js'
      },
      redux: {
        main: './dist/redux.js',
        defaultExtension: 'js'
      },
      'redux-logger': {
        main: './dist/index.js',
        defaultExtension: 'js'
      },
      '@angular-redux/core': {
        main: 'lib/index.js',
        defaultExtension: 'js'
      },
      '@angular-redux/router': {
        main: 'lib/es5/index.js',
        defaultExtension: 'js'
      },
      '@angular-redux/store': {
        main: 'lib/index.js',
        defaultExtension: 'js'
      },
      'ng2-redux': {
        main: './index.js',
        defaultExtension: 'js'
      },
      'ng2-redux-router': {
        main: './index.js',
        defaultExtension: 'js'
      },
      'symbol-observable': {
        main: './index.js',
        defaultExtension: 'js'
      }
    }
});
