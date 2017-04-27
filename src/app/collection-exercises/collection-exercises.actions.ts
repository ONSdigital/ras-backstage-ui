import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';

import { CollectionExercise } from './shared/collection-exercise.model';
import { CollectionExercisesService } from "./collection-exercises.service";

@Injectable()
export class CollectionExercisesActions {

    static RETRIEVE_SINGLE = 'COLLECTION_EXERCISE_RETRIEVE';
    static RECEIVED_SINGLE = 'COLLECTION_EXERCISE_RECEIVED';
    static RETRIEVE_ALL = 'COLLECTION_EXERCISES_RETRIEVE_ALL';
    static RECEIVED_ALL = 'COLLECTION_EXERCISES_RECEIVED_ALL';
    static LOAD_COLLECTION_INSTRUMENT_BUNDLE = 'COLLECTION_INSTRUMENT_BUNDLE_LOAD';

    constructor(
        private ngRedux: NgRedux<any>,
        private collectionExercisesService:CollectionExercisesService) {}

    public retrieveCollectionExercise(collectionExerciseRef:string) {

        this.ngRedux.dispatch({
            type: CollectionExercisesActions.RETRIEVE_SINGLE,
            collectionExerciseRef: collectionExerciseRef
        });

        return this.collectionExercisesService
            .getCollectionExercise(collectionExerciseRef)
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

        this.ngRedux.dispatch({
            type: CollectionExercisesActions.RECEIVED_SINGLE,
            collectionExercise: collectionExercise
        });
    }

    public retrieveCollectionExercises() {

        this.ngRedux.dispatch({
            type: CollectionExercisesActions.RETRIEVE_ALL
        });

        return this.collectionExercisesService
            .getCollectionExercises()
            .then((payload:any) => {

                this.receivedCollectionExercises(payload.data.collectionExercises);

                return payload;
            });
    }

    public receivedCollectionExercises(collectionExerciseArr:Array<CollectionExercise>) {

        this.ngRedux.dispatch({
            type: CollectionExercisesActions.RECEIVED_ALL,
            collectionExercises: collectionExerciseArr
        });
    }

    public putCollectionInstrumentBundle(collectionExerciseRef:String) {

        console.log('Put collection instrument for collection exercise: ', collectionExerciseRef);

        this.ngRedux.dispatch({
            type: CollectionExercisesActions.LOAD_COLLECTION_INSTRUMENT_BUNDLE,
            collectionExerciseRef: collectionExerciseRef
        });
    }
}
