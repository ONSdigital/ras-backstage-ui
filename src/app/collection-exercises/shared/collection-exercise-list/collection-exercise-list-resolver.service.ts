import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { CollectionExerciseListViewModel, CollectionExercise } from '../collection-exercise.model';
import { Survey } from '../../../surveys/shared/survey.model';
import { CollectionExercisesActions } from '../../collection-exercises.actions';

@Injectable()
export class CollectionExerciseListResolver implements Resolve<CollectionExerciseListViewModel> {

    constructor(
        private collectionExercisesActions: CollectionExercisesActions) { }

    resolve(route: ActivatedRouteSnapshot): Observable<CollectionExerciseListViewModel> {

        /**
         * TODO
         * Check store/dispatch Redux action first
         */

        /**
         * Update store with new survey data from list received
         */

        /**
         * Update store with new collection instrument data from list received
         */

         const survey = {
             urn: '500',
             inquiryCode: '221',
             name: 'Business Register and Employment Survey',
             abbr: 'BRES'
         };

        const observable = this.collectionExercisesActions.retrieveCollectionExercises()
            .map((collectionExercises: Array<CollectionExercise>) => this.createViewModel(collectionExercises, survey));

        return observable;
    }

    /**
     * TODO
     * Refactor to import transformer to change collectionExerciseArr in appropriate viewModel
     */
    private createViewModel(collectionExerciseArr: Array<CollectionExercise>, survey: Survey): CollectionExerciseListViewModel {

        return {
            collectionExercises: collectionExerciseArr.map((collectionExercise: CollectionExercise) => {

                return {
                    surveyTitle: survey.name + ' - ' + collectionExercise.period.abbr,
                    link: collectionExercise.link
                };
            })
        };
    }

}
