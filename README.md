# Backstage UI
Angular application for internal ONS staff to manage collection exercises. To utilise an accompanying API.

## Development

### Global development dependencies
Angular CLI:
npm install -g @angular/cli

### Compile app for development with watches
Using a command line tool, from the project root:
* Run `gulp dev`

### Run unit tests using Angular CLI
Without coverage:
* Run `ng test`
With Istabul code coverage report generation:
* Run `ng test --code-coverage`

### Run linting using Angular CLI
Using a command line tool, from the project root:
* Run `ng lint`

## Production build
### Compile app with aot and enableProdMode enabled
Using a command line tool, from the project root:
* Run `node_modules/.bin/ngc -p tsconfig-aot.json` to create aot app compilation
* Run `gulp prod` to transpile aot with typescript compiler
* Run `node_modules/.bin/rollup -c rollup-config.js` to perform tree shaking and produce the application bundle
* (Optional) Run `gulp server`
