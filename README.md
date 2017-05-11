# Backstage UI
Angular application for internal ONS staff to manage collection exercises. Utilises an accompanying microservice-based API.

## Development

### Prerequisites development dependencies
* Install Node.js
* Install the Gulp: `npm install -g gulp`
* Install the Angular CLI: `npm install -g @angular/cli`
* Git clone the sdc-global-design-patterns repo and checkout the update-patterns-sdc branch
* Run the local Node.js dev server (in the backstage UI project root): `node server.js`

### Development Environment tasks
* Run the app in development (with watches) `ng serve`
* Run unit tests without code coverage report generation: `ng test`
* Run unit tests with code coverage report generation (the report goes into the '/coverage' folder): `ng test --code-coverage`
* Run linting: `ng lint`

## Production build

### Using Angular CLI: Compile app
* Run `ng build` to build the app in the '/dist' folder
* Run `gulp remove-test-tags` to remove all data-test html attributes from the generated .js files in the '/dist' folder
* TODO: further refine this build process

## Or:

### Using Gulp: Compile app with aot and enableProdMode enabled
Using a command line tool, from the project root:
* Run `node_modules/.bin/ngc -p tsconfig-aot.json` to create aot app compilation
* Run `gulp prod` to transpile aot with typescript compiler
* Run `node_modules/.bin/rollup -c rollup-config.js` to perform tree shaking and produce the application bundle
* (Optional) Run `gulp server`
