const commonRoot = '//ras-backstage-service-ci.apps.devtest.onsclofo.uk/backstage-api/v1/';

export const environment = {
    production: false,
    endpoints: {

        /**
         * Gateway
         */
        // collectionExercise:     '//ras-api-gateway-ci.apps.devtest.onsclofo.uk/',
        // collectionInstrument:   '//ras-api-gateway-ci.apps.devtest.onsclofo.uk/collection-instrument-api/1.0.2/',
        // survey:                 '//ras-api-gateway-ci.apps.devtest.onsclofo.uk/',
        // secureMessages:      '//ras-api-gateway-ci.apps.devtest.onsclofo.uk/',
        // party:               '//ras-api-gateway-ci.apps.devtest.onsclofo.uk/',

        /**
         * Static routing
         */
        // secureMessages:         '//ras-secure-messaging-ci.apps.devtest.onsclofo.uk/',
        // party:                  '//ras-party-service-ci.apps.devtest.onsclofo.uk/party-api/v1/',

        /**
         * API
         */
        authentication:             commonRoot,
        collectionExercise:         commonRoot + 'collection-exercise-service/',
        collectionInstrument:       commonRoot + 'collection-instrument-service/collection-instrument-api/1.0.2/',
        survey:                     commonRoot + 'survey-service/',
        secureMessages:             commonRoot + 'secure-message-service/',
        party:                      commonRoot + 'party-service/party-api/v1/'
    }
};
