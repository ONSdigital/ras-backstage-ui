export interface CollectionExercise {
    id?: Number;
    key_dates: Object;
    period: String;
    samples: Array<any>;
    state: String;
    survey_ref: String
}

export interface CollectionExerciseDetailsViewModel {
    surveyTitle:String;
    inquiryCode:String;
    referencePeriod:String;
}
