import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { NgRedux } from '@angular-redux/store';
import 'rxjs/add/operator/find';
import { Subscription } from 'rxjs/Subscription';

import { Survey } from '../../../surveys/shared/survey.model';
import { CollectionExercisesActions } from '../../collection-exercises.actions';
import { CollectionExercise, CollectionExerciseDetailsViewModel } from '../collection-exercise.model';
import { getDataStoreCollectionExerciseByRef } from '../utils';

@Component({
    template: `
        <ons-collection-exercise-details
            [collectionExerciseDetails]="viewModel"
            (load_cis_click_handler)="collectionInstrumentLoadClick_handler($event)"></ons-collection-exercise-details>
    `
})
export class CollectionExerciseDetailsContainerComponent implements OnInit, OnDestroy {

    public routeParamSubscription: Subscription;
    public viewModel: CollectionExerciseDetailsViewModel;

    constructor(
        private ngRedux: NgRedux<any>,
        private route: ActivatedRoute,
        private collectionExerciseActions: CollectionExercisesActions) {}

    ngOnInit() {

        let collectionExerciseRef: string;

        this.routeParamSubscription = this.route.params
            .flatMap((params: any) => {

                /**
                 * Reference held for error.
                 */
                collectionExerciseRef = params['collection-exercise-ref'];

                return getDataStoreCollectionExerciseByRef(this.ngRedux, params['collection-exercise-ref']);
            })
            .subscribe((collectionExercise: any) => {

                /**
                 * TODO
                 * Remove survey - get from data store
                 */
                const survey: Survey = {
                    urn: '500',
                    inquiryCode: '221',
                    name: 'Business Register and Employment Survey',
                    abbr: 'BRES'
                };

                if (collectionExercise) {
                    this.viewModel = this.createViewModel(collectionExercise, survey, {});
                } else {
                    console.log('Collection exercise with ref "' + collectionExerciseRef + '" not found in store.');
                }
            });
    }

    ngOnDestroy() {
        this.routeParamSubscription.unsubscribe();
    }

    public collectionInstrumentLoadClick_handler() {
        this.collectionExerciseActions.loadCollectionInstrumentBundle('123');
    }

    private createViewModel(collectionExercise: CollectionExercise, survey: Survey, collectionInstrument: any):
        CollectionExerciseDetailsViewModel {

        /**
         * TODO
         * Format data for reference period.
         */
        return {
            surveyTitle: survey.name,
            inquiryCode: survey.inquiryCode,
            referencePeriod: 'The period will appear here',
            surveyAbbr: survey.abbr + ' - ' + collectionExercise.period.abbr
        };
    }
}
