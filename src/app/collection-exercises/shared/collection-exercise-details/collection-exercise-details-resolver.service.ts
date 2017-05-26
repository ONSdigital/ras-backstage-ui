import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

import { NgRedux } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/first';

import { CollectionExercise } from '../collection-exercise.model';
import { CollectionExercisesActions } from '../../collection-exercises.actions';
import { CollectionInstrumentsService } from '../../../collection-instruments/collection-instruments.service';

import { getDataStoreCollectionExerciseByRef } from '../utils';
import * as moment from 'moment';

@Injectable()
export class CollectionExerciseDetailsResolver implements Resolve<Observable<any>> {

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
        private collectionInstrumentsService: CollectionInstrumentsService) { }

    resolve(route: ActivatedRouteSnapshot): Observable<any> {

        const id = route.params['collection-exercise-ref'];

        // Used to export for breadcrumb.
        const exported: any = {};

        return getDataStoreCollectionExerciseByRef(this.ngRedux, id)

            /**
             * If collection exercise doesn't exist in store, fetch it from the service
             */
            .flatMap((existingCollectionExercise: any) => {

                return existingCollectionExercise
                    ? Observable.of(existingCollectionExercise)
                    : this.collectionExercisesActions.retrieveCollectionExercise(id);
            })

            .flatMap((collectionExercise: CollectionExercise) => {

                exported.collectionExercise = collectionExercise;

                return this.collectionInstrumentsService.getStatus(collectionExercise.id)
                    .do((collectionInstrumentStatus: any) => {

                        exported.collectionInstrumentStatus = collectionInstrumentStatus;
                    });
            })

            /**
             * Return all resolved data
             */
            .map(() => {
                console.log('exported: ', exported);
                return exported;
            });

    }
}
