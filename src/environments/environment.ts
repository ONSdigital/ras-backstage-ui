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

        // Local
        // survey:                  'http://localhost:8050/api/',
        // collectionInstrument:    'http://localhost:8050/collection-instruments/api/',
        // collectionExercise:      'http://localhost:8050/api/'
        // secureMessages:          'http://0.0.0.0:5050/',
        // party:                   'http://localhost:4801/party-api/v1/',
        authentication:             'http://localhost:8050/api/authentication/',

        // Gateway
        // collectionExercise:      '//ras-api-gateway-test.apps.devtest.onsclofo.uk/',
        collectionInstrument:       '//ras-api-gateway-test.apps.devtest.onsclofo.uk/collection-instrument-api/1.0.2/',
        // survey:                  '//ras-api-gateway-test.apps.devtest.onsclofo.uk/',
        // secureMessages:          '//ras-api-gateway-int.apps.devtest.onsclofo.uk/',
        // party:                   '//ras-api-gateway-sit.apps.devtest.onsclofo.uk/party-api/v1/'

        /**
         * Static routing
         */
        // survey:                  '//surveysvc-test.apps.devtest.onsclofo.uk/',
        // collectionInstrument:    '//ras-collection-instrument-test.apps.devtest.onsclofo.uk/',
        // party:                   '//ras-party-service-test.apps.devtest.onsclofo.uk/',
        // collectionExercise:      '//collectionexercisesvc-test.apps.devtest.onsclofo.uk/',
        // secureMessages:          '//ras-secure-messaging-test.apps.devtest.onsclofo.uk/',

        /**
         * New API endpoints
         */
        collectionExercise:         '//ras-backstage-service-test.apps.devtest.onsclofo.uk/backstage-api/v1/collection-exercise-service/',
        // collectionInstrument:    '//ras-backstage-service-test.apps.devtest.onsclofo.uk/backstage-api/v1/collection-instrument-api/1.0.2/',
        survey:                     '//ras-backstage-service-test.apps.devtest.onsclofo.uk/backstage-api/v1/survey-service/',
        secureMessages:             '//ras-backstage-service-test.apps.devtest.onsclofo.uk/backstage-api/v1/secure-message-service/',
        party:                      '//ras-backstage-service-test.apps.devtest.onsclofo.uk/backstage-api/v1/party-service/party-api/v1/'
    }
};
