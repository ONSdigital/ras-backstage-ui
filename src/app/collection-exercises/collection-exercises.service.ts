import { Injectable } from '@angular/core';

function temp_createCollectionExercise() {

    return {
        id: 123,
        link: 'bres-2017',
        period: {
            abbr: '2017'
        },
        '@survey': {
            inquiryCode: 221,
            name: 'Business Register and Emploment Survey',
            abbr: 'BRES'
        }
    };
}

@Injectable()
export class CollectionExercisesService {

    getCollectionExercise(id: string): Promise<any> {

        const payload: any = {
            data: {
                collectionExercise: temp_createCollectionExercise()
            }
        };

        return Promise.resolve(payload);
    }

    getCollectionExercises(): Promise<any> {

        const payload: any = {
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

    putCollectionInstrumentBundle(collectionExerciseRef: string): Promise<any> {

        return Promise.resolve();

    }
}
