import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';

import { Observable } from 'rxjs/Observable';
/*import { select } from '@angular-redux/store';
import { Subscription } from 'rxjs/Subscription';*/

import { CollectionExercise, CollectionExerciseDetailsViewModel } from '../collection-exercise.model';
import { CollectionExercisesActions } from '../../collection-exercises.actions';

@Injectable()
export class CollectionExerciseDetailsResolver implements Resolve<CollectionExerciseDetailsViewModel> {

    /*@select('collectionExercises')
    private collectionExercisesStore: Observable<Array<CollectionExercise>>;
    private collectionExercisesSubscription:Subscription;*/

    constructor(
        private collectionExercisesActions: CollectionExercisesActions) { }

    resolve(route: ActivatedRouteSnapshot): Observable<CollectionExerciseDetailsViewModel> {

        const id = route.params['id'];


        const observable = this.collectionExercisesActions.retrieveCollectionExercise(id)
            .map((collectionExercise: CollectionExercise) => this.createViewModel(collectionExercise, {}, {}));

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
    private createViewModel(collectionExercise: CollectionExercise, survey: any, collectionInstrument: any):
        CollectionExerciseDetailsViewModel {

        return {
            surveyTitle: survey.name,
            inquiryCode: survey.inquiryCode,
            referencePeriod: 'period here',
            surveyAbbr: survey.abbr + ' ' + collectionExercise.period.abbr
        };
    }
}
