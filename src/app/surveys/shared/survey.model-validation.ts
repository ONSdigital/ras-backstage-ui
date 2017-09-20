import { global } from '../../shared/utils';

export function validateSurvey (data: any) {

    return global.validateProperties(data, [
        { propertyName: 'id' },
        { propertyName: 'longName' },
        { propertyName: 'shortName' },
        { propertyName: 'surveyRef' }
    ]);
}
