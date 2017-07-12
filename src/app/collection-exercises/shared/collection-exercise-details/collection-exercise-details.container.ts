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

import { validateSurvey } from '../../../surveys/shared/survey.model-validation';
import { SurveysActions } from '../../../surveys/surveys.actions';

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
        const from = moment(collectionExercise.scheduledStartDateTime, serviceDateFormat);
        const to = moment(collectionExercise.scheduledEndDateTime, serviceDateFormat);

        return from.format(outputDateFormat) + ' - ' + to.format(outputDateFormat);
    }

    constructor(
        private ngRedux: NgRedux<any>,
        private route: ActivatedRoute,
        private surveysActions: SurveysActions,
        private collectionInstrumentsActions: CollectionInstrumentsActions) { }

    ngOnInit() {

        let collectionExerciseRef: string,
            collectionInstrumentStatus: any;

        if (this.route.snapshot.data && this.route.snapshot.data.exported) {
            collectionInstrumentStatus = this.route.snapshot.data.exported.collectionInstrumentStatus;
        } else {
            console.log('collectionInstrumentStatus not found on route data: ', this.route.snapshot.data);
            return;
        }

        this.routeParamSubscription = this.route.params
            .flatMap((params: any) => {  
                collectionExerciseRef = params['collection-exercise-ref']; 

                return getDataStoreCollectionExerciseByRef(this.ngRedux, collectionExerciseRef); 
            }) 
            .subscribe((collectionExercise: any) => {

                 if (collectionExercise) {

                    /**
                     * TODO
                     * Call survey service from resolver
                     */
                    this.surveysActions.retrieveSurvey(collectionExercise.surveyId)
                        .subscribe((survey: Survey) => {

                            if (!survey || validateSurvey(survey)) {
                                return;
                            }

                            this.viewModel = this.createViewModel(collectionExercise, survey, collectionInstrumentStatus);
                        });

                } else {
                    console.log('Collection exercise with ref "' + collectionExerciseRef + '" not found in store.'); 
                }
            });
    }

    ngOnDestroy() {
        if (this.routeParamSubscription) {
            this.routeParamSubscription.unsubscribe();
        }
    }

    public collectionInstrumentBatchLoadClick_handler() {

        this.viewModel.isButtonDisabled = true;

        this.collectionInstrumentsActions.loadCollectionInstrumentBatch(this.viewModel.id)
            .subscribe(res => {
                this.viewModel.collectionInstrumentBatch.status = res.status;
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
            surveyTitle: survey.longName,
            inquiryCode: survey.surveyRef,
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
