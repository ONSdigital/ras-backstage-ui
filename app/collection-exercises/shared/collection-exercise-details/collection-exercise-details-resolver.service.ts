import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';

import { CollectionExerciseDetailsViewModel } from '../collection-exercise.model';
import { CollectionExercisesService } from '../../collection-exercises.service';

@Injectable()
export class CollectionExerciseDetailsResolver implements Resolve<CollectionExerciseDetailsViewModel> {

    constructor(
        private collectionExerciseSVC:CollectionExercisesService) {}

    resolve(route:ActivatedRouteSnapshot):Promise<CollectionExerciseDetailsViewModel> {

        let id = route.params['id'];

        return this.collectionExerciseSVC.getCollectionExercise(id)
            .then((collectionExerciseView:CollectionExerciseDetailsViewModel) => {

                console.log(collectionExerciseView);

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
