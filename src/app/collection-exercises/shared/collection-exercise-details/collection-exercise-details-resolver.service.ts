import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';

import { select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
// import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/defaultIfEmpty';
import 'rxjs/add/operator/find';

import { CollectionExercise, CollectionExerciseDetailsViewModel } from '../collection-exercise.model';
import { Survey } from '../../../surveys/shared/survey.model';
import { CollectionExercisesActions } from '../../collection-exercises.actions';
import { CollectionInstrumentsService } from '../../../collection-instruments/collection-instruments.service';

import { environment } from '../../../../environments/environment';
import * as moment from 'moment';

@Injectable()
export class CollectionExerciseDetailsResolver implements Resolve<CollectionExerciseDetailsViewModel> {

    @select('collectionExercises')
    private collectionExercisesStore: Observable<Array<CollectionExercise>>;
    private collectionExercisesSubscription: Subscription;
    private collectionExercises: Array<CollectionExercise> = [];

    private BASE_URL = environment.endpoints.collectionInstrument;

    public static buildReferencePeriod(collectionExercise: CollectionExercise) {
        const serviceDateFormat = 'YYYY-MM-DDThh:mm:ssZ';       // e.g. 2017-05-15T00:00:00Z
        const outputDateFormat = 'D MMM YYYY';                  // e.g. 15 May 2017

        const from = moment(collectionExercise.scheduledStart, serviceDateFormat);
        const to = moment(collectionExercise.scheduledEnd, serviceDateFormat);

        return from.format(outputDateFormat) + ' - ' + to.format(outputDateFormat);
    }

    constructor(
        private collectionExercisesActions: CollectionExercisesActions,
        private collectionInstrumentsService: CollectionInstrumentsService) { }

    resolve(route: ActivatedRouteSnapshot): Observable<CollectionExerciseDetailsViewModel> {

        const id = route.params['collection-exercise-ref'];

        // TODO retrieve the survey from service tier rather than hard code
        const survey: Survey = {
            id: 'cb0711c3-0ac8-41d3-ae0e-567e5ea1ef87',
            inquiryCode: '221',
            name: 'Business Register and Employment Survey',
            abbr: 'BRES'
        };

        // TODO remove this
        // Parallel
        // const observable = Observable.forkJoin([
        //   this.collectionExercisesActions.retrieveCollectionExercise(id),
        //   this.collectionInstrumentsService.getStatus(survey.abbr, '2016')]
        // );
        // return observable;

        // Single call
        // const observable = this.collectionExercisesActions.retrieveCollectionExercise(id)
        //     .map((collectionExercise: CollectionExercise) =>
        //         this.createViewModel(collectionExercise, survey, {}));
        //
        // return observable;

        // Single call
        // const observable = this.collectionInstrumentsService.getStatus(survey.abbr, '2016');
        // observable.subscribe(
        //     (data: any) => {
        //         console.log(data);
        //     }
        // );
        // return observable;

        const observable = this.collectionExercisesActions.retrieveCollectionExercise(id);

        return observable.flatMap((collectionExercise: CollectionExercise) => {

            return this.collectionInstrumentsService.getStatus(collectionExercise.id)
                .map((collectionInstrumentBatch: any) => {

                    return this.createViewModel(collectionExercise, survey, collectionInstrumentBatch);
                });
        });
    }

    /**
     * Transform data and return view model
     */
    private createViewModel(collectionExercise: CollectionExercise, survey: Survey, collectionInstrumentBatch: any):
        CollectionExerciseDetailsViewModel {

        return {
            id: collectionExercise.id,
            surveyTitle: survey.name,
            inquiryCode: survey.inquiryCode,
            referencePeriod: CollectionExerciseDetailsResolver.buildReferencePeriod(collectionExercise),
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
