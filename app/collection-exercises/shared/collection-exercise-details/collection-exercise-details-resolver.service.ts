import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';

/*import { select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';*/

import { CollectionExercise } from '../collection-exercise.model';
import { CollectionExerciseDetailsViewModel } from '../collection-exercise.model';
import { CollectionExercisesActions } from '../../collection-exercises.actions';

@Injectable()
export class CollectionExerciseDetailsResolver implements Resolve<CollectionExerciseDetailsViewModel> {

    /*@select('collectionExercises')
    private collectionExercisesStore: Observable<Array<CollectionExercise>>;
    private collectionExercisesSubscription:Subscription;*/

    constructor(
        private collectionExercisesActions:CollectionExercisesActions) {}

    resolve(route:ActivatedRouteSnapshot):Promise<CollectionExerciseDetailsViewModel> {

        let id = route.params['id'];

        /**
         * TODO
         * Check store/dispatch Redux action first
         */

        return this.collectionExercisesActions
            .retrieveCollectionExercise(id)
            .then((collectionExercise:CollectionExercise) => {

                console.log(collectionExercise);

                return collectionExercise || (():null => {

                    /**
                     * Handle error - not found
                     * ...
                     */
                    console.log('Could not find collection exercise.');

                    return null;
                });
            });
    }
}
