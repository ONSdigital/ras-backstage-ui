import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot } from '@angular/router';

import { select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/first';

import { CollectionExercise, CollectionExerciseDetailsViewModel } from '../collection-exercise.model';
import { Survey } from '../../../surveys/shared/survey.model';
import { CollectionExercisesActions } from '../../collection-exercises.actions';
import { AnonymousSubject } from 'rxjs/Subject';

@Injectable()
export class CollectionExerciseDetailsResolver implements Resolve<CollectionExerciseDetailsViewModel> {

    @select(['collectionExercises', 'items'])
    private collectionExercisesItemsStore: AnonymousSubject<any>;
    private collectionExercises: Array<CollectionExercise> = [];

    constructor(
        private collectionExercisesActions: CollectionExercisesActions) { }

    resolve(route: ActivatedRouteSnapshot): Observable<any> {

        const link = route.params['collection-exercise-ref'];

        const survey = {
            urn: '500',
            inquiryCode: '221',
            name: 'Business Register and Employment Survey',
            abbr: 'BRES'
        };

        const storeCheckObservable = this.collectionExercisesItemsStore
            .asObservable()
            .map((collectionExercises: any) => {

                const collectionExercise = collectionExercises.find((item: any) => {
                    return item.link === link;
                });
                return collectionExercise || false;
            })
            .first();

        return storeCheckObservable
            .flatMap((existingCollectionExercise: any) => {
                console.log('condition', !!existingCollectionExercise);

                return existingCollectionExercise
                    ? Observable.of(existingCollectionExercise)
                    : this.collectionExercisesActions.retrieveCollectionExercise(link);
            })
            .map((collectionExercise: CollectionExercise) => {
                console.log('view model');
                return this.createViewModel(collectionExercise, survey, {});
            });



        /*const observable = this.collectionExercisesActions.retrieveCollectionExercise(id)
            .map((collectionExercise: CollectionExercise) =>
                this.createViewModel(collectionExercise, survey, {})
            );

        return observable;*/




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
