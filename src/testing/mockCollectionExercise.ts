export function createMockCollectionExercise (id: string, link: string) {
    return {
        'id': id,
        'link': link,
        'period': {
            'type': 'annual',
            'abbr': '2016',
            'from': {
                'day': '01',
                'month': '01',
                'year': '2016'
            },
            'to': {
                'day': '01',
                'month': '01',
                'year': '2016'
            }
        },
        'surveyId': '123'
    };
}
