// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
    production: false,
    endpoints: {

        // Run services locally by executing the following at the command line for each service:
        // PORT=xxxx ./scripts/run.py

        // Local config

        // Run Collection Exercise Demo service using:
        // ONS_ENV=test ./scripts/run.sh
        collectionExercise: 'http://localhost:8081/collection-exercise-api/1.0.0/',

        collectionInstrument: 'http://localhost:8080/collection-instrument-api/1.0.2/',
        survey: 'http://localhost:8000/api/',
        secureMessages: 'http://0.0.0.0:5050/'

        // CloudFoundry config
        // collectionExercise: 'http://ras-collection-exercise-demo.apps.mvp.onsclofo.uk/collection-exercise-api/1.0.0/',
        // collectionInstrument: 'http://ras-collection-instrument-demo.apps.mvp.onsclofo.uk/collection-instrument-api/1.0.2/',
        // survey: 'http://localhost:8000/api/'

        // TODO remove this
        // collectionExercise: 'http://localhost:8000/api/',
    }
};
