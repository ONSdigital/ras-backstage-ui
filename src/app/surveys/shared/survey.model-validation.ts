import { validateProperties } from '../../shared/utils';
import { Survey } from './survey.model';

export function validateSurvey (data: Survey) {

    return validateProperties(data, [
        { propertyName: 'id' },
        { propertyName: 'longName' },
        { propertyName: 'shortName' },
        { propertyName: 'surveyRef' }
    ]);
}
