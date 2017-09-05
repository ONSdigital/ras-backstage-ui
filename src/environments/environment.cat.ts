const commonRoot = '//ras-backstage-service-cat.apps.devtest.onsclofo.uk/backstage-api/v1/';

export const environment = {
    production: false,
    endpoints: {
        // collectionExercise: '//ras-api-gateway-cat.apps.devtest.onsclofo.uk/',
        // collectionInstrument: '//ras-api-gateway-cat.apps.devtest.onsclofo.uk/collection-instrument-api/1.0.2/',
        // survey: '//ras-api-gateway-cat.apps.devtest.onsclofo.uk/',
        // secureMessages: '//ras-api-gateway-cat.apps.devtest.onsclofo.uk/',

        /**
         * API
         */
        authentication:             commonRoot,
        collectionExercise:         commonRoot + 'collection-exercise-service/',
        collectionInstrument:       commonRoot + 'collection-instrument-service/collection-instrument-api/1.0.2/',
        survey:                     commonRoot + 'survey-service/',
        secureMessages:             commonRoot + 'secure-message-service/',
        party:                      commonRoot + 'party-service/party-api/v1/',

        /**
         * Response operations
         */
        responseOperationsApplication: 'http://response-operations-ui-cat.apps.devtest.onsclofo.uk/'
    }
};
