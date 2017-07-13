export function createMockCollectionExercise (id: string) {

    return<any> {
        id: id,
        surveyId: 'cb0711c3-0ac8-41d3-ae0e-567e5ea1ef87',
        name: '201601',
        actualExecutionDateTime: '2017-05-15T14:20:24Z',
        scheduledExecutionDateTime: '2017-05-15T00:00:00Z',
        scheduledStartDateTime: '2017-06-01T00:00:00Z',
        actualPublishDateTime: null,
        periodStartDateTime: '2016-01-01T00:00:00Z',
        periodEndDateTime: '2016-12-31T00:00:00Z',
        scheduledReturnDateTime: '2017-06-30T00:00:00Z',
        scheduledEndDateTime: '2017-12-31T00:00:00Z',
        executedBy: 'Fred Bloggs',
        state: 'EXECUTED',
        caseTypes: [
            {
                sampleUnitTypeFK: 'B',
                actionPlanId: '60df56d9-f491-4ac8-b256-a10154290a8b'
            }, {
                sampleUnitTypeFK: 'BI',
                actionPlanId: 'b1f46e33-a3ef-4e50-939d-c18f8a9f11bb'
            }
        ]
    };
}
