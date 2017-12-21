// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

const commonRoot = '//localhost:8001/backstage-api/v1/';

export const environment = {
    production: false,
    endpoints: {

        authentication:             commonRoot,
        collectionExercise:         commonRoot + 'collection-exercise-service/',
        collectionInstrument:       commonRoot + 'collection-instrument-service/collection-instrument-api/1.0.2/',
        survey:                     commonRoot + 'survey-service/',
        secureMessages:             commonRoot + 'secure-message/',
        party:                      commonRoot + 'party/',

        responseOperationsApplication: 'http://response-operations-ui-sit.apps.devtest.onsclofo.uk/'
    }
};
