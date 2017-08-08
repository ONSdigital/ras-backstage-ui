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
        // collectionExercise: 'http://localhost:8081/collection-exercise-api/1.0.0/',
        // collectionInstrument: 'http://localhost:8080/collection-instrument-api/1.0.2/',
        // survey: 'http://localhost:8050/api/',
        secureMessages: 'http://0.0.0.0:5050/',
        party: 'http://localhost:4801/party-api/v1/',

        // CloudFoundry config
        collectionExercise: '//ras-api-gateway-int.apps.devtest.onsclofo.uk/',
        collectionInstrument: '//ras-api-gateway-int.apps.devtest.onsclofo.uk/collection-instrument-api/1.0.2/',
        survey: '//ras-api-gateway-int.apps.devtest.onsclofo.uk/',
        // secureMessages: '//ras-api-gateway-int.apps.devtest.onsclofo.uk/',
        // party: '//ras-api-gateway-sit.apps.devtest.onsclofo.uk/party-api/v1/'

        // TODO remove this
        // collectionInstrument: 'http://localhost:8050/api/',
        // collectionExercise: 'http://localhost:8050/api/'

        /*collectionExercise: '//ras-api-gateway-test.apps.devtest.onsclofo.uk/',
        collectionInstrument: '//ras-api-gateway-test.apps.devtest.onsclofo.uk:80/collection-instrument-api/1.0.2/',*/
    }
};
