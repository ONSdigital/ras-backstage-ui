const commonRoot = '//securemessaging.ons.statistics.gov.uk/backstage-api/v1/';

export const environment = {
    production: false,
    endpoints: {

        authentication:             commonRoot,
        collectionExercise:         commonRoot + 'collection-exercise-service/',
        collectionInstrument:       commonRoot + 'collection-instrument-service/collection-instrument-api/1.0.2/',
        survey:                     commonRoot + 'survey-service/',
        secureMessages:             commonRoot + 'secure-message/',
        party:                      commonRoot + 'party/',

        responseOperationsApplication: '//responseoperations.ons.statistics.gov.uk/'
    }
};
