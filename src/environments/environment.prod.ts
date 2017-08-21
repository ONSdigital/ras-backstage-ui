export const environment = {
    production: false,
    endpoints: {

        /**
         * Gateway
         */
        collectionExercise:     '//ras-api-gateway-prod.apps.prod.cf5.onsclofo.uk/',
        collectionInstrument:   '//ras-api-gateway-prod.apps.prod.cf5.onsclofo.uk/collection-instrument-api/1.0.2/',
        survey:                 '//ras-api-gateway-prod.apps.prod.cf5.onsclofo.uk/',
        // secureMessages:      '//ras-api-gateway-prod.apps.prod.cf5.onsclofo.uk/',
        // party:               '//ras-api-gateway-prod.apps.prod.cf5.onsclofo.uk/',

        /**
         * Static routing
         */
        secureMessages:         '//ras-secure-messaging-prod.apps.devtest.onsclofo.uk/',
        party:                  '//ras-party-service-prod.apps.devtest.onsclofo.uk/',

        authentication:         '//ras-backstage-service-prod.apps.devtest.onsclofo.uk/backstage-api/v1/'
    }
};
