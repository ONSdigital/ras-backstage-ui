export const environment = {
    production: false,
    endpoints: {

        /**
         * Gateway
         */
        // collectionExercise:     '//ras-api-gateway-preprod.apps.prod.cf5.onsclofo.uk/',
        // collectionInstrument:   '//ras-api-gateway-preprod.apps.prod.cf5.onsclofo.uk/collection-instrument-api/1.0.2/',
        // survey:                 '//ras-api-gateway-preprod.apps.prod.cf5.onsclofo.uk/',
        // secureMessages:      '//ras-api-gateway-preprod.apps.prod.cf5.onsclofo.uk/',
        // party:               '//ras-api-gateway-preprod.apps.prod.cf5.onsclofo.uk/',

        /**
         * Static routing
         */
        // secureMessages:         '//ras-secure-messaging-preprod.apps.devtest.onsclofo.uk/',
        // party:                  '//ras-party-service-preprod.apps.devtest.onsclofo.uk/party-api/v1/',

        authentication:         '//ras-backstage-service-preprod.apps.prod.cf5.onsclofo.uk/backstage-api/v1/',
        collectionExercise:     '//ras-backstage-service-preprod.apps.prod.cf5.onsclofo.uk/backstage-api/v1/collection-exercise-service/',
        collectionInstrument:   '//ras-backstage-service-preprod.apps.prod.cf5.onsclofo.uk/backstage-api/v1/collection-instrument-service/',
        survey:                 '//ras-backstage-service-preprod.apps.prod.cf5.onsclofo.uk/backstage-api/v1/survey-service/',
        secureMessages:         '//ras-backstage-service-preprod.apps.prod.cf5.onsclofo.uk/backstage-api/v1/secure-message-service/',
        party:                  '//ras-backstage-service-preprod.apps.prod.cf5.onsclofo.uk/backstage-api/v1/party-service/party-api/v1/'
    }
};
