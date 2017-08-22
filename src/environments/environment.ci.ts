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

        authentication:         '//ras-backstage-service-ci.apps.devtest.onsclofo.uk/backstage-api/v1/',
        collectionExercise:     '//ras-backstage-service-ci.apps.devtest.onsclofo.uk/backstage-api/v1/collection-exercise-service/',
        collectionInstrument:   '//ras-backstage-service-ci.apps.devtest.onsclofo.uk/backstage-api/v1/collection-instrument-service/',
        survey:                 '//ras-backstage-service-ci.apps.devtest.onsclofo.uk/backstage-api/v1/survey-service/',
        secureMessages:         '//ras-backstage-service-ci.apps.devtest.onsclofo.uk/backstage-api/v1/secure-message-service/',
        party:                  '//ras-backstage-service-ci.apps.devtest.onsclofo.uk/backstage-api/v1/party-service/party-api/v1/'
    }
};
