# Backstage UI
Angular application for internal ONS staff to manage collecion exercises. To utilise an accompanying API.

## Development
### Compile app for development with watches
Using a command line tool, from the project root:
* Run `gulp dev`


## Production build
### Compile app with aot and enableProdMode enabled
Using a command line tool, from the project root:
* Run `node_modules/.bin/ngc -p tsconfig-aot.json` to create aot app compilation
* Run `gulp prod` to transpile aot with typescript compiler
* Run `node_modules/.bin/rollup -c rollup-config.js` to perform tree shaking and produce the application bundle
* (Optional) Run `gulp server`
