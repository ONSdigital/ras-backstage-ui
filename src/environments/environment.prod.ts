const commonRoot = '//ras-backstage-service-prod.apps.prod.cf5.onsclofo.uk/backstage-api/v1/';

export const environment = {
    production: false,
    endpoints: {

        /**
         * Gateway
         */
        // collectionExercise:     '//ras-api-gateway-prod.apps.prod.cf5.onsclofo.uk/',
        // collectionInstrument:   '//ras-api-gateway-prod.apps.prod.cf5.onsclofo.uk/collection-instrument-api/1.0.2/',
        // survey:                 '//ras-api-gateway-prod.apps.prod.cf5.onsclofo.uk/',
        // secureMessages:      '//ras-api-gateway-prod.apps.prod.cf5.onsclofo.uk/',
        // party:               '//ras-api-gateway-prod.apps.prod.cf5.onsclofo.uk/',

        /**
         * Static routing
         */
        // secureMessages:         '//ras-secure-messaging-prod.apps.devtest.onsclofo.uk/',
        // party:                  '//ras-party-service-prod.apps.devtest.onsclofo.uk/party-api/v1/',

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
        responseOperationsApplication: 'http://response-operations-ui-prod.apps.prod.cf5.onsclofo.uk/'
    }
};
