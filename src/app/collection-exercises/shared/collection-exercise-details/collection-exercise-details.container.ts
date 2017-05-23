import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { NgRedux } from '@angular-redux/store';
import 'rxjs/add/operator/find';
import { Subscription } from 'rxjs/Subscription';

import { Survey } from '../../../surveys/shared/survey.model';
import { CollectionExercise, CollectionExerciseDetailsViewModel } from '../collection-exercise.model';
import { CollectionInstrumentsActions } from '../../../collection-instruments/collection-instruments.actions';

import { getDataStoreCollectionExerciseByRef } from '../utils';
import { environment } from '../../../../environments/environment';
import * as moment from 'moment';

@Component({
    template: `
        <ons-collection-exercise-details
            [collectionExerciseDetails]="viewModel"
            (load_ci_batch_click_handler)="collectionInstrumentBatchLoadClick_handler($event)"></ons-collection-exercise-details>
    `
})
export class CollectionExerciseDetailsContainerComponent implements OnInit, OnDestroy {

    public routeParamSubscription: Subscription;
    public viewModel: CollectionExerciseDetailsViewModel;

    private BASE_URL = environment.endpoints.collectionInstrument;

    public static buildReferencePeriod(collectionExercise: CollectionExercise) {
        const serviceDateFormat = 'YYYY-MM-DDThh:mm:ssZ';       // e.g. 2017-05-15T00:00:00Z
        const outputDateFormat = 'D MMM YYYY';                  // e.g. 15 May 2017

        const from = moment(collectionExercise.scheduledStart, serviceDateFormat);
        const to = moment(collectionExercise.scheduledEnd, serviceDateFormat);

        return from.format(outputDateFormat) + ' - ' + to.format(outputDateFormat);
    }

    constructor(
        private ngRedux: NgRedux<any>,
        private route: ActivatedRoute,
        private collectionInstrumentsActions: CollectionInstrumentsActions) { }


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
                    id: 'cb0711c3-0ac8-41d3-ae0e-567e5ea1ef87',
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

    public collectionInstrumentBatchLoadClick_handler() {

        this.viewModel.isButtonDisabled = true;

        this.collectionInstrumentsActions.loadCollectionInstrumentBatch(this.viewModel.id)
            .subscribe(res => {

                // TODO remove this delay
                // setTimeout(() => {

                    this.viewModel.collectionInstrumentBatch.status = res.status;

                // }, 3000);
            },
            err => {
                // Log any errors
                console.log(err);
            });
    }

    private createViewModel(collectionExercise: CollectionExercise, survey: Survey, collectionInstrumentBatch: any):
        CollectionExerciseDetailsViewModel {

        return {
            id: collectionExercise.id,
            surveyTitle: survey.name,
            inquiryCode: survey.inquiryCode,
            referencePeriod: CollectionExerciseDetailsContainerComponent.buildReferencePeriod(collectionExercise),
            surveyAbbr: collectionExercise.name,
            collectionInstrumentBatch: {
                current: collectionInstrumentBatch.current,
                status: collectionInstrumentBatch.status
            },
            isButtonDisabled: false,
            csvEndpoint: this.BASE_URL + 'download_csv/' + collectionExercise.id
        };
    }
}
