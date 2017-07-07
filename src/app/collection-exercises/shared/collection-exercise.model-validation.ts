import { validateProperties, validationOutput } from '../../shared/utils';
import { CollectionExercise } from './collection-exercise.model';

export function validateCollectionExercise (data: CollectionExercise) {

    let collectionExerciseValidation: any,
        caseTypesValidation: any,
        response: any = [];

    if (!data.caseTypes) {
        validationOutput({
            notification: 'caseTypes array does not exist on CollectionExercise data',
            subjectLabel: 'CollectionExercise data: ',
            subject: data
        });
    } else {
        caseTypesValidation = data.caseTypes.filter((caseType: any) => {
            return validateProperties(caseType, [
                { propertyName: 'sampleUnitType' },
                { propertyName: 'actionPlanID' },
            ]);
        });
    }

    collectionExerciseValidation = validateProperties(data, [
        { propertyName: 'id' },
        { propertyName: 'surveyID' },
        { propertyName: 'name' },
        { propertyName: 'actualExecution' },
        { propertyName: 'scheduledExecution' },
        { propertyName: 'scheduledStart' },
        { propertyName: 'actualPublish' },
        { propertyName: 'completionFor' },
        { propertyName: 'scheduledReturn' },
        { propertyName: 'scheduledEnd' },
        { propertyName: 'executedBy' },
        { propertyName: 'state' },
        { propertyName: 'caseTypes' }
    ]);

    if (collectionExerciseValidation) {
        response = collectionExerciseValidation;
    }

    if (caseTypesValidation) {
        response = response.concat(caseTypesValidation);
    }

    return response.length ? response : false;
}
