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
            .then((payload:{ data:{ collectionExercise:CollectionExercise } }) => {

                console.log('Resolver: ', payload.data);

                if(!payload.data.collectionExercise) {
                    console.log('Could not find collection exercise.');
                    return null;
                }

                /**
                 * Dispatch redux action to update surveys & collection instruments
                 */
                /*if(payload.data.collectionExercise['@survey']) {
                    this.receivedSurvey(payload.data.collectionExercise['@survey']);
                }

                if(payload.data.collectionExercise['@collectionInstrument']) {
                    this.receivedCollectionInstrument(payload.data.collectionExercise['@collectionInstrument']);
                }*/

                let collectonExercise = payload.data.collectionExercise;


                let survey = payload.data.collectionExercise['@survey'];

                /**
                 * Transform data and return view model
                 */
                return this.createViewModel(collectonExercise, survey, {});
            });
    }

    private createViewModel(collectionExercise:CollectionExercise, survey:any, collectionInstrument:any):CollectionExerciseDetailsViewModel {

        return {
            surveyTitle: survey.name,
            inquiryCode: survey.inquiryCode,
            referencePeriod: 'period here',
            surveyAbbr: survey.abbr + ' ' + collectionExercise.period.abbr
        };
    }
}
