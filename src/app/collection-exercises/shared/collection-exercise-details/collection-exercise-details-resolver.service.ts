import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

import { NgRedux } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/first';

import { CollectionExercisesActions } from '../../collection-exercises.actions';
import { CollectionExerciseDetailsViewModel } from '../collection-exercise.model';
import { getDataStoreCollectionExerciseByRef } from '../utils';

@Injectable()
export class CollectionExerciseDetailsResolver implements Resolve<CollectionExerciseDetailsViewModel> {

    constructor(
        private ngRedux: NgRedux<any>,
        private collectionExercisesActions: CollectionExercisesActions) { }

    resolve(route: ActivatedRouteSnapshot): Observable<any> {

        const collectionExerciseRef = route.params['collection-exercise-ref'];

        return getDataStoreCollectionExerciseByRef(this.ngRedux, collectionExerciseRef)
            .flatMap((existingCollectionExercise: any) => existingCollectionExercise
                ? Observable.of(existingCollectionExercise)
                : this.collectionExercisesActions.retrieveCollectionExercise(collectionExerciseRef)
            );

        /**
         * TODO
         * Rework - create multiple resolver types for different api calls
         */
        /*if(payload.data.collectionExercise['@survey']) {
            this.receivedSurvey(payload.data.collectionExercise['@survey']);
        }

        if(payload.data.collectionExercise['@collectionInstrument']) {
            this.receivedCollectionInstrument(payload.data.collectionExercise['@collectionInstrument']);
        }*/

    }
}
