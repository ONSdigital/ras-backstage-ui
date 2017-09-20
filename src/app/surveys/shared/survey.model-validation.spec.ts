import { validateSurvey } from './survey.model-validation';
import { global } from '../../shared/utils';

const originalGlobalValidateProperties = global.validateProperties;

const validModelProperties = function () {
    return {
        id: '123',
        longName: 'Long survey name',
        shortName: 'Short survey name',
        surveyRef: 'Survey reference'
    };
};

const invalidModelProperties = function () {
    return {
        shortName: 'Short survey name',
        surveyRef: 'Survey reference'
    };
};

describe('validateSurvey [function]', () => {

    beforeEach(() => {
        spyOn(global, 'validateProperties').and.callThrough();
    });

    afterEach(() => {
        global.validateProperties = originalGlobalValidateProperties;
    });

    it('should call validateProperties with correct properties', () => {
        validateSurvey(validModelProperties());

        expect(global.validateProperties).toHaveBeenCalledWith(validModelProperties(), [
            { propertyName: 'id' },
            { propertyName: 'longName' },
            { propertyName: 'shortName' },
            { propertyName: 'surveyRef' }
        ]);
    });

    describe('when model properties are missing', () => {

        it('should return an array of failed validation', () => {
            const result: any = validateSurvey(invalidModelProperties());

            expect(result.length).toEqual(2);
            expect(result[0]).toEqual({ propertyName: 'id' });
            expect(result[1]).toEqual({ propertyName: 'longName' });
        });
    });

    describe('when all expected model properties are found', () => {

        it('should return false', () => {
            const result: any = validateSurvey(validModelProperties());

            expect(result).toEqual(false);
        });
    });
});
