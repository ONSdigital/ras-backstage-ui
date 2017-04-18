import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';

import { CollectionExerciseDetailsViewModel } from '../collection-exercise.model';
import { CollectionExercisesService } from '../../collection-exercises.service';

@Injectable()
export class CollectionExercisesDetailsResolver implements Resolve<CollectionExerciseDetailsViewModel> {

    constructor(
        private collectionExerciseSVC:CollectionExercisesService) {}

    resolve(route:ActivatedRouteSnapshot):Promise<CollectionExerciseDetailsViewModel> {

        let id = route.params['id'];

        return this.collectionExerciseSVC.getCollectionExercise(id)
            .then((collectionExerciseView:CollectionExerciseDetailsViewModel) => {

                if(collectionExerciseView) {

                    /**
                     * Dispatch Redux event then return
                     * ...
                     */

                    return collectionExerciseView;
                }
                else {

                    /**
                     * Handle error - not found
                     * ...
                     */

                    return null;

                }
            });
    }
}
