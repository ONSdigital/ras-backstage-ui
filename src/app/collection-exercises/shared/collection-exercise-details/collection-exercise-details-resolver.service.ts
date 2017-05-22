import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

import { NgRedux } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/first';

import { Survey } from '../../../surveys/shared/survey.model';
import { CollectionExercise } from '../collection-exercise.model';
import { CollectionExercisesActions } from '../../collection-exercises.actions';
import { CollectionInstrumentsService } from '../../../collection-instruments/collection-instruments.service';

import { environment } from '../../../../environments/environment';
import * as moment from 'moment';

@Injectable()
export class CollectionExerciseDetailsResolver implements Resolve<Observable<any>> {

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
        private collectionExercisesActions: CollectionExercisesActions,
        private collectionInstrumentsService: CollectionInstrumentsService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<any> {

        const id = route.params['collection-exercise-ref'];

        // TODO retrieve the survey from service tier rather than hard code
        const survey: Survey = {
                id: 'cb0711c3-0ac8-41d3-ae0e-567e5ea1ef87',
                inquiryCode: '221',
                name: 'Business Register and Employment Survey',
                abbr: 'BRES'
            };

        /**
         * Used to export for breadcrumb.
         */
        let exported: any = {};

        const storeCheckObservable = this.ngRedux.select(['collectionExercises', 'items'])
            .map((collectionExercises: any) => {

                const collectionExercise = collectionExercises.find((item: any) => {
                    return item.id === id;
                });

                exported.collectionExercise = collectionExercise;

                return collectionExercise || false;
            })
            .first();

        return storeCheckObservable
            .flatMap((existingCollectionExercise: any) => {
                return existingCollectionExercise
                    ? Observable.of(existingCollectionExercise)
                    : this.collectionExercisesActions.retrieveCollectionExercise(id);
            })
            .flatMap((collectionExercise: CollectionExercise) => {
                return this.collectionInstrumentsService.getStatus(collectionExercise.id);
            })
            .map(collectionInstrumentBatch => {

                /**
                 * Required for breadcrumb - could use a resolved data object.
                 */
                return exported;
            });

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

    }
}
