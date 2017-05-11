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
* `ng serve --open` Runs the app in development (with watches). Open flag opens the app in a new browser window.
* `ng test` Runx unit tests without code coverage report generation
* `ng test --code-coverage` Runs unit tests with code coverage report generation (the report goes into the '/coverage' folder)
* `ng lint` Runs linting

## Production build

### Using Angular CLI: Compile app
* `ng build` Builds the app in the '/dist' folder
* `gulp remove-test-tags` removes all data-test html attributes from the generated .js files in the '/dist' folder
* TODO: further refine this build process

## Or:

### Using Gulp: Compile app with aot and enableProdMode enabled
Using a command line tool, from the project root:
* `node_modules/.bin/ngc -p tsconfig-aot.json` Creates aot app compilation
* `gulp prod` transpiles aot with typescript compiler
* `node_modules/.bin/rollup -c rollup-config.js` performstree shaking and produces the application bundle
* (Optional) Run `gulp server`
