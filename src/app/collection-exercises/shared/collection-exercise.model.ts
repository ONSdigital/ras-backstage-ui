export interface CollectionExercise {
    id: string;
    surveyID: string;
    name: string;
    actualExecution: string;
    scheduledExecution: string;
    scheduledStart: string;
    actualPublish: string;
    completionFor: string;
    scheduledReturn: string;
    scheduledEnd: string;
    executedBy: string;
    state: string;
    caseTypes: [
        {
            sampleUnitType: string,
            actionPlanID: string
        }, {
            sampleUnitType: string,
            actionPlanID: string
        }
    ];
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
