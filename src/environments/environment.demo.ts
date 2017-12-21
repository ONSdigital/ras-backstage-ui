const commonRoot = '//ras-backstage-service-demo.apps.devtest.onsclofo.uk/backstage-api/v1/';

export const environment = {
    production: false,
    endpoints: {

        authentication:             commonRoot,
        collectionExercise:         commonRoot + 'collection-exercise-service/',
        collectionInstrument:       commonRoot + 'collection-instrument-service/collection-instrument-api/1.0.2/',
        survey:                     commonRoot + 'survey-service/',
        secureMessages:             commonRoot + 'secure-message/',
        party:                      commonRoot + 'party/',

        responseOperationsApplication: 'http://response-operations-ui-demo.apps.devtest.onsclofo.uk/'
    }
};
