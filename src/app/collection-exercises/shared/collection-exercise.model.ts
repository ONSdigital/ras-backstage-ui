export interface CollectionExercise {
    id: string;
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
    id: string;
    surveyTitle: string;
    inquiryCode: string;
    referencePeriod: string;
    surveyAbbr: string;
    collectionInstrumentBatch: {
        current: number;
        status: string;
    };
    isButtonDisabled: boolean;
    csvEndpoint: string;
}

export interface CollectionExerciseListViewModel {
    collectionExercises: Array<any>;
}
