import { validateProperties, validationOutput } from '../../shared/utils';
import { CollectionExercise } from './collection-exercise.model';

export function validateCollectionExercise (data: CollectionExercise) {

    const collectionExerciseValidation = validateProperties(data, [
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

    let caseTypesValidation: any;

    if (!data.caseTypes) {
        validationOutput({
            notification: 'caseTypes array does not exist on CollectionExercise data',
            subjectLabel: 'CollectionExercise data: ',
            subject: data
        });
        return;
    }

    caseTypesValidation = validateProperties(data.caseTypes, [
        { propertyName: 'sampleUnitType' },
        { propertyName: 'actionPlanID' },
    ]);

    return [].concat(caseTypesValidation, collectionExerciseValidation);
}
