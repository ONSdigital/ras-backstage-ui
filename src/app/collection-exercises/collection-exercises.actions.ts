import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';

import { CollectionExercise } from './shared/collection-exercise.model';
import { CollectionExercisesService } from './collection-exercises.service';

@Injectable()
export class CollectionExercisesActions {

    static RETRIEVE_SINGLE = 'COLLECTION_EXERCISE_RETRIEVE';
    static RECEIVED_SINGLE = 'COLLECTION_EXERCISE_RECEIVED';
    static RETRIEVE_ALL = 'COLLECTION_EXERCISES_RETRIEVE_ALL';
    static RECEIVED_ALL = 'COLLECTION_EXERCISES_RECEIVED_ALL';

    constructor(
        private ngRedux: NgRedux<any>,
        private collectionExercisesService: CollectionExercisesService) { }

    public retrieveCollectionExercise(link: string) {

        this.ngRedux.dispatch({
            type: CollectionExercisesActions.RETRIEVE_SINGLE,
            id: link
        });

        const observable = this.collectionExercisesService.getCollectionExercise(link);

        observable.subscribe(
            // Normalise data first to keep entities in data store dry before saving
            // Update data store
            (collectionExercise: CollectionExercise) => {
                this.receivedCollectionExercise(collectionExercise);
            }
        );
        return observable;
    }

    public receivedCollectionExercise(collectionExercise: CollectionExercise) {

        this.ngRedux.dispatch({
            type: CollectionExercisesActions.RECEIVED_SINGLE,
            collectionExercise: collectionExercise
        });
    }

    public retrieveCollectionExercises() {

        this.ngRedux.dispatch({
            type: CollectionExercisesActions.RETRIEVE_ALL
        });

        const observable = this.collectionExercisesService.getCollectionExercises()
            .share();

        observable.subscribe(
            (collectionExercises: CollectionExercise[]) => this.receivedCollectionExercises(collectionExercises)
        );

        return observable;
    }

    public receivedCollectionExercises(collectionExerciseArr: Array<CollectionExercise>) {

        this.ngRedux.dispatch({
            type: CollectionExercisesActions.RECEIVED_ALL,
            collectionExercises: collectionExerciseArr
        });
    }
}
