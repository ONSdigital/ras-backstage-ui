export const environment = {
    production: false,
    endpoints: {

        /**
         * Gateway
         */
        collectionExercise:     '//ras-api-gateway-preprod.apps.prod.cf5.onsclofo.uk/',
        collectionInstrument:   '//ras-api-gateway-preprod.apps.prod.cf5.onsclofo.uk/collection-instrument-api/1.0.2/',
        survey:                 '//ras-api-gateway-preprod.apps.prod.cf5.onsclofo.uk/',
        // secureMessages:      '//ras-api-gateway-preprod.apps.prod.cf5.onsclofo.uk/',
        // party:               '//ras-api-gateway-preprod.apps.prod.cf5.onsclofo.uk/',

        /**
         * Static routing
         */
        secureMessages:         '//ras-secure-messaging-preprod.apps.devtest.onsclofo.uk/',
        party:                  '//ras-party-service-preprod.apps.devtest.onsclofo.uk/',

        authentication:         '//ras-backstage-service-test.apps.devtest.onsclofo.uk/backstage-api/v1/'
    }
};
