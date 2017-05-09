export interface CollectionExercise {
    id?: Number;
    // key_dates:Object;
    period: { abbr: string };
    // samples:Array<any>;
    // state:string;
    survey_ref: string;
}

export interface CollectionExerciseDetailsViewModel {
    surveyTitle: string;
    inquiryCode: string;
    referencePeriod: string;
    surveyAbbr: string;
}

export interface CollectionExerciseListViewModel {
    collectionExercises: Array<CollectionExerciseDetailsViewModel>;
}
