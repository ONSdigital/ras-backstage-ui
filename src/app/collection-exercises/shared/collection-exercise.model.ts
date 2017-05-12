export interface CollectionExercise {
    urn: string;
    link: string;
    period: {
        type: string,
        abbr: string,
        from: {
            day: string,
            month: string,
            year: string
        },
        to: {
            day: string,
            month: string,
            year: string
        }
    };
    surveyId: string;
    collectionInstrumentBundleIds: [string];
}

export interface CollectionExerciseDetailsViewModel {
    surveyTitle: string;
    inquiryCode: string;
    referencePeriod: string;
    surveyAbbr: string;
    collectionInstrumentBatch: {
        count: string;
        current: string;
        status: string;
    };
}

export interface CollectionExerciseListViewModel {
    collectionExercises: Array<any>;
}
