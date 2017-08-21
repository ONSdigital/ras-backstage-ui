export const environment = {
    production: false,
    endpoints: {

        /**
         * Gateway
         */
        collectionExercise:     '//ras-api-gateway-test.apps.devtest.onsclofo.uk/',
        collectionInstrument:   '//ras-api-gateway-test.apps.devtest.onsclofo.uk/collection-instrument-api/1.0.2/',
        survey:                 '//ras-api-gateway-test.apps.devtest.onsclofo.uk/',
        // secureMessages:      '//ras-api-gateway-test.apps.devtest.onsclofo.uk/'
        // party:               '//ras-api-gateway-test.apps.devtest.onsclofo.uk/'

        /**
         * Static routing
         */
        secureMessages:         '//ras-secure-messaging-test.apps.devtest.onsclofo.uk/',
        party:                  '//ras-party-service-test.apps.devtest.onsclofo.uk/party-api/v1/',

        authentication:         '//ras-backstage-service-test.apps.devtest.onsclofo.uk/backstage-api/v1/'
    }
};
