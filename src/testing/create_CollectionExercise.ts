export function createMockCollectionExercise (id: string) {

    return<any> {
        id: id,
        surveyID: 'cb0711c3-0ac8-41d3-ae0e-567e5ea1ef87',
        name: '201601',
        actualExecution: '2017-05-15T14:20:24Z',
        scheduledExecution: '2017-05-15T00:00:00Z',
        scheduledStart: '2017-06-01T00:00:00Z',
        actualPublish: null,
        completionFor: null,
        scheduledReturn: '2017-06-30T00:00:00Z',
        scheduledEnd: '2017-12-31T00:00:00Z',
        executedBy: 'Fred Bloggs',
        state: 'EXECUTED',
        caseTypes: [
            {
                sampleUnitType: 'B',
                actionPlanID: '60df56d9-f491-4ac8-b256-a10154290a8b'
            }, {
                sampleUnitType: 'BI',
                actionPlanID: 'b1f46e33-a3ef-4e50-939d-c18f8a9f11bb'
            }
        ]
    };
}
