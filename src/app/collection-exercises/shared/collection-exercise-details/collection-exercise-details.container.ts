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
    public BASE_URL = environment.endpoints.collectionInstrument;

    public static resolveBreadcrumb(dataResolved: {exported: any}): string {
        if (!dataResolved.exported ||
            !dataResolved.exported.collectionExercise ||
            !dataResolved.exported.collectionExercise.name) {

            return '';
        }

        return dataResolved.exported.collectionExercise.name;
    }

    public static buildReferencePeriod(collectionExercise: CollectionExercise) {
        const serviceDateFormat = 'YYYY-MM-DDThh:mm:ssZ';
        const outputDataFormat = 'D MMM YYYY';
        const from = moment(collectionExercise.periodStartDateTime, serviceDateFormat);
        const to = moment(collectionExercise.periodEndDateTime, serviceDateFormat);

        return from.format(outputDataFormat) + ' - ' + to.format(outputDataFormat);
    }

    constructor(
        private ngRedux: NgRedux<any>,
        private route: ActivatedRoute,
        private collectionInstrumentsActions: CollectionInstrumentsActions) {}

    ngOnInit() {

        let collectionExerciseRef: string,
            collectionInstrumentStatus: any,
            survey: any;

        const routeData = this.route.snapshot.data;

        if (routeData && routeData.exported) {
            collectionInstrumentStatus = routeData.exported.collectionInstrumentStatus;
            survey = routeData.exported.survey;

            if (!collectionInstrumentStatus) {
                console.log('collectionInstrumentStatus not found on route data: ', this.route.snapshot.data);
                return;
            }

            if (!survey) {
                console.log('survey not found on route data: ', this.route.snapshot.data);
                return;
            }

        } else {
            console.log('exported data not found on route: ', this.route.snapshot.data);
            return;
        }

        this.routeParamSubscription = this.route.params
            .flatMap((params: any) => {
                collectionExerciseRef = params['collection-exercise-ref'];

                return getDataStoreCollectionExerciseByRef(this.ngRedux, collectionExerciseRef);
            })
            .subscribe(
                (collectionExercise: any) => {

                    if (collectionExercise) {
                        this.viewModel = this.createViewModel(collectionExercise, survey, collectionInstrumentStatus);
                    } else {
                        console.log('Collection exercise with ref "' + collectionExerciseRef + '" not found in store');
                    }
                },
                (err: any) => console.log('Error: ', err)
            );
    }

    ngOnDestroy() {
        if (this.routeParamSubscription) {
            this.routeParamSubscription.unsubscribe();
        }
    }

    public collectionInstrumentBatchLoadClick_handler() {

        this.viewModel.isButtonDisabled = true;

        this.collectionInstrumentsActions.loadCollectionInstrumentBatch(this.viewModel.id)
            .subscribe(
                (res: any) => this.viewModel.collectionInstrumentBatch.status = res.status,
                (err: any) => console.log(err)
            );
    }

    private createViewModel(collectionExercise: CollectionExercise, survey: Survey, collectionInstrumentBatch: any
        ): CollectionExerciseDetailsViewModel {

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
