import { CollectionExercise } from "./shared/collection-exercise.model";

export class CollectionExercisesService {

    getCollectionExercise(id:string):Promise<any> {

        /**
         * Get collection exercise from the server
         */
        /*let ce:CollectionExercise = {
            surveyTitle: 'kergk',
            inquiryCode: 'reget',
            referencePeriod: 'erheh'
        };*/

        let payload:any = {
            data: {
                collectionExercise: {
                    id: 123,
                    period: {},
                    '@survey': {
                        inquiryCode: 22122,
                        name: "Business Register and Emploment Survey different",
                        abbr: "bres different"
                    }
                }
            }
        };

        return Promise.resolve(payload);
    }
}
