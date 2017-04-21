import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';

import { CollectionExercise } from './shared/collection-exercise.model';
import { CollectionExercisesService } from "./collection-exercises.service";

@Injectable()
export class CollectionExercisesActions {

    static RETRIEVE_SINGLE = 'COLLECTION_EXERCISE_RETRIEVE';
    static RECEIVED_SINGLE = 'COLLECTION_EXERCISE_RECEIVED';

    constructor(
        private ngRedux: NgRedux<any>,
        private collectionExercisesService:CollectionExercisesService) {}

    public retrieveCollectionExercise(ref:string) {

        this.ngRedux.dispatch({
            type: CollectionExercisesActions.RETRIEVE_SINGLE,
            collectionExerciseRef: ref
        });

        return this.collectionExercisesService
            .getCollectionExercise(ref)
            .then((payload:any) => {

                /**
                 * Normalise data first to keep entities in data store dry before saving
                 * Update data store
                 */
                this.receivedCollectionExercise(payload.data.collectionExercise);

                return payload;
            });
    }

    public receivedCollectionExercise(collectionExercise:CollectionExercise) {

        /**
         * Update data store
         */
        this.ngRedux.dispatch({
            type: CollectionExercisesActions.RECEIVED_SINGLE,
            collectionExercise: collectionExercise
        });
    }
}
