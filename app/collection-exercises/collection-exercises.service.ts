import { CollectionExerciseDetailsViewModel } from "./shared/collection-exercise.model";

export class CollectionExercisesService {

    getCollectionExercise(id:string):Promise<CollectionExerciseDetailsViewModel> {

        /**
         * Get collection exercise from the server
         */
        let ce:CollectionExerciseDetailsViewModel = {
            surveyTitle: 'kergk',
            inquiryCode: 'reget',
            referencePeriod: 'erheh'
        };
        return Promise.resolve(ce);
    }
}
