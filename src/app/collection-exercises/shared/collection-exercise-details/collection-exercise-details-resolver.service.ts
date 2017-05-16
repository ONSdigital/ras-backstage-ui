import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot } from '@angular/router';

import { select, NgRedux } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/first';

import { Survey } from '../../../surveys/shared/survey.model';
import { CollectionExercisesActions } from '../../collection-exercises.actions';
import { CollectionExercise, CollectionExerciseDetailsViewModel } from '../collection-exercise.model';

@Injectable()
export class CollectionExerciseDetailsResolver implements Resolve<CollectionExerciseDetailsViewModel> {

    constructor(
        private ngRedux: NgRedux<any>,
        private collectionExercisesActions: CollectionExercisesActions) { }

    resolve(route: ActivatedRouteSnapshot): Observable<any> {

        const link = route.params['collection-exercise-ref'];

        const survey = {
            urn: '500',
            inquiryCode: '221',
            name: 'Business Register and Employment Survey',
            abbr: 'BRES'
        };

        const storeCheckObservable = this.ngRedux.select(['collectionExercises', 'items'])
            .map((collectionExercises: any) => {

                const collectionExercise = collectionExercises.find((item: any) => {
                    return item.link === link;
                });

                return collectionExercise || false;
            })
            .first();

        return storeCheckObservable
            .flatMap((existingCollectionExercise: any) => {
                return existingCollectionExercise
                    ? Observable.of(existingCollectionExercise)
                    : this.collectionExercisesActions.retrieveCollectionExercise(link);
            })
            .map((collectionExercise: CollectionExercise) => {
                return this.createViewModel(collectionExercise, survey, {});
            });


        /*const observable = this.collectionExercisesActions.retrieveCollectionExercise(id)
            .map((collectionExercise: CollectionExercise) =>
                this.createViewModel(collectionExercise, survey, {})
            );

        return observable;*/


        /**
         * Rework - create multiple resolver types for different api calls
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
