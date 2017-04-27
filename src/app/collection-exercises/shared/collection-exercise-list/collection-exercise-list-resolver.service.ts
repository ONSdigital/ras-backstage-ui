import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

import { CollectionExerciseListViewModel, CollectionExercise } from "../collection-exercise.model";
import { CollectionExercisesActions } from '../../collection-exercises.actions';

@Injectable()
export class CollectionExerciseListResolver implements Resolve<CollectionExerciseListViewModel> {

    constructor(
        private collectionExercisesActions:CollectionExercisesActions) {}

    resolve(route:ActivatedRouteSnapshot):Promise<CollectionExerciseListViewModel> {

        return this.collectionExercisesActions
            .retrieveCollectionExercises()
            .then((payload: { data: { collectionExercises:Array<CollectionExercise> } }) => {

                /**
                 * Update store with new survey data from list received
                 */

                /**
                 * Update store with new collection instrument data from list received
                 */

                return this.createViewModel(payload.data.collectionExercises);
            });
    }

    private createViewModel(collectionExerciseArr:Array<CollectionExercise>):CollectionExerciseListViewModel {

        return {
            collectionExercises: collectionExerciseArr.map((collectionExercise:any) => {

                let survey = collectionExercise['@survey'];

                return {
                    surveyTitle: survey.name + ' - ' + collectionExercise.period.abbr,
                    link: collectionExercise.link
                };
            })
        };
    }

}
