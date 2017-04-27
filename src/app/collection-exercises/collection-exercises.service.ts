function temp_createCollectionExercise() {

    return {
        id: 123,
        link: 'bres-2017',
        period: {
            abbr: "2017"
        },
        '@survey': {
            inquiryCode: 221,
            name: "Business Register and Emploment Survey",
            abbr: "BRES"
        }
    };
}

export class CollectionExercisesService {

    getCollectionExercise(id:string):Promise<any> {

        let payload:any = {
            data: {
                collectionExercise: temp_createCollectionExercise()
            }
        };

        return Promise.resolve(payload);
    }

    getCollectionExercises():Promise<any> {

        let payload:any = {
            data: {
                collectionExercises: [
                    temp_createCollectionExercise(),
                    temp_createCollectionExercise(),
                    temp_createCollectionExercise(),
                    temp_createCollectionExercise(),
                    temp_createCollectionExercise()
                ]
            }
        };

        return Promise.resolve(payload);
    }

    putCollectionInstrumentBundle(collectionExerciseRef:string):Promise<any> {

        return Promise.resolve();

    }
}
