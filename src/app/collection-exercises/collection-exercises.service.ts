import { CollectionExercise } from "./shared/collection-exercise.model";

export class CollectionExercisesService {

    getCollectionExercise(id:string):Promise<any> {

        let payload:any = {
            data: {
                collectionExercise: {
                    id: 123,
                    period: {
                        abbr: "2017"
                    },
                    '@survey': {
                        inquiryCode: 221,
                        name: "Business Register and Emploment Survey",
                        abbr: "BRES"
                    }
                }
            }
        };

        return Promise.resolve(payload);
    }
}
