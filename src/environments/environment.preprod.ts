const commonRoot = '//securemessagingdev.ons.statistics.gov.uk/backstage-api/v1/';

export const environment = {
    production: false,
    endpoints: {

        authentication:             commonRoot,
        collectionExercise:         commonRoot + 'collection-exercise-service/',
        collectionInstrument:       commonRoot + 'collection-instrument-service/collection-instrument-api/1.0.2/',
        survey:                     commonRoot + 'survey-service/',
        secureMessages:             commonRoot + 'secure-message/',
        party:                      commonRoot + 'party-service/party-api/v1/',

        responseOperationsApplication: '//responseoperationsdev.ons.statistics.gov.uk/'
    }
};
