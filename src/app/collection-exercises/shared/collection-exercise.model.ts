export interface CollectionExercise {
    id: string;
    surveyId: string;
    name: string;
    actualExecutionDateTime: string;
    scheduledExecutionDateTime: string;
    scheduledStartDateTime: string;
    actualPublishDateTime: string;
    periodStartDateTime: string;
    periodEndDateTime: string;
    scheduledReturnDateTime: string;
    scheduledEndDateTime: string;
    executedBy: string;
    state: string;
    caseTypes: [
        {
            sampleUnitTypeFK: string,
            actionPlanId: string
        }, {
            sampleUnitTypeFK: string,
            actionPlanId: string
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
