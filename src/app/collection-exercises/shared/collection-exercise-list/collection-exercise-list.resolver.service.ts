import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { CollectionExerciseListViewModel, CollectionExercise } from '../collection-exercise.model';
import { Survey } from '../../../surveys/shared/survey.model';
import { CollectionExercisesActions } from '../../collection-exercises.actions';

import { SurveysActions } from '../../../surveys/surveys.actions';

@Injectable()
export class CollectionExerciseListResolver implements Resolve<CollectionExerciseListViewModel> {

    constructor(
        private collectionExercisesActions: CollectionExercisesActions) { }

    resolve(route: ActivatedRouteSnapshot): Observable<CollectionExerciseListViewModel> {

        /**
         * TODO
         * Remove survey to get from service
         */
        const survey: Survey = {
            id: 'cb0711c3-0ac8-41d3-ae0e-567e5ea1ef87',
            surveyRef: '221',
            longName: 'Business Register and Employment Survey',
            shortName: 'BRES'
        };

        const observable = this.collectionExercisesActions.retrieveCollectionExercises()
            .map((collectionExercises: Array<any>) => {

                /*this.surveysActions.retrieveSurvey(collectionExercise.surveyId)
                    .subscribe((survey: Survey) => {
                        this.viewModel = this.createViewModel(collectionExercise, survey, collectionInstrumentStatus);
                    });*/

                return this.createViewModel(collectionExercises, survey);
            })
            .share();

        return observable;
    }

    private createViewModel(collectionExerciseArr: Array<CollectionExercise>, survey: Survey): CollectionExerciseListViewModel {

        return {
            collectionExercises: collectionExerciseArr.map((collectionExercise: any) => {

                return {
                    id: collectionExercise.id,
                    name: survey.longName + ' - ' + collectionExercise.name
                };
            })
        };
    }

}
