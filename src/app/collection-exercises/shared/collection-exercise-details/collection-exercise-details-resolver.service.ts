import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';

import { Observable } from 'rxjs/Observable';
/*import { select } from '@angular-redux/store';
import { Subscription } from 'rxjs/Subscription';*/

import { CollectionExercise, CollectionExerciseDetailsViewModel } from '../collection-exercise.model';
import { Survey } from '../../../surveys/shared/survey.model';
import { CollectionExercisesActions } from '../../collection-exercises.actions';

@Injectable()
export class CollectionExerciseDetailsResolver implements Resolve<CollectionExerciseDetailsViewModel> {

    /*@select('collectionExercises')
    private collectionExercisesStore: Observable<Array<CollectionExercise>>;
    private collectionExercisesSubscription:Subscription;*/

    constructor(
        private collectionExercisesActions: CollectionExercisesActions) { }

    resolve(route: ActivatedRouteSnapshot): Observable<CollectionExerciseDetailsViewModel> {

        const id = route.params['collection-exercise-ref'];

        const survey = {
            urn: '500',
            inquiryCode: '221',
            name: 'Business Register and Employment Survey',
            abbr: 'BRES'
        };

        const observable = this.collectionExercisesActions.retrieveCollectionExercise(id)
            .map((collectionExercise: CollectionExercise) =>
                this.createViewModel(collectionExercise, survey, {})
            );

        return observable;

        /**
         * TODO
         * Check store/dispatch Redux action first
         */

        /**
         * Dispatch redux action to update surveys & collection instruments
         */
        /*if(payload.data.collectionExercise['@survey']) {
            this.receivedSurvey(payload.data.collectionExercise['@survey']);
        }

        if(payload.data.collectionExercise['@collectionInstrument']) {
            this.receivedCollectionInstrument(payload.data.collectionExercise['@collectionInstrument']);
        }*/

    }

    /**
     * Transform data and return view model
     */
    private createViewModel(collectionExercise: CollectionExercise, survey: Survey, collectionInstrument: any):
        CollectionExerciseDetailsViewModel {

        return {
            surveyTitle: survey.name,
            inquiryCode: survey.inquiryCode,
            referencePeriod: 'The period will appear here',
            surveyAbbr: survey.abbr + ' - ' + collectionExercise.period.abbr
        };
    }
}
