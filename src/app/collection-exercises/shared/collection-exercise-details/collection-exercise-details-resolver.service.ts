import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

import { NgRedux } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/first';

import { CollectionExercise } from '../collection-exercise.model';
import { CollectionExercisesActions } from '../../collection-exercises.actions';
import { CollectionInstrumentsService } from '../../../collection-instruments/collection-instruments.service';

import { validateSurvey } from '../../../surveys/shared/survey.model-validation';
import { SurveysActions } from '../../../surveys/surveys.actions';

import { getDataStoreCollectionExerciseByRef } from '../utils';

@Injectable()
export class CollectionExerciseDetailsResolver implements Resolve<Observable<any>> {

    public validateSurvey: Function = validateSurvey;

    constructor(
        private ngRedux: NgRedux<any>,
        private surveysActions: SurveysActions,
        private collectionExercisesActions: CollectionExercisesActions,
        private collectionInstrumentsService: CollectionInstrumentsService) {}

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

                const observable = Observable
                    .zip(
                        this.collectionInstrumentsService.getStatus(collectionExercise.id)
                            .map((res: any) => res.json()),
                        this.surveysActions.retrieveSurvey(collectionExercise.surveyId)
                            .map((res: any) => res.json()),

                        (collectionInstrumentStatus: any, survey: any) => {

                            if (!survey || this.validateSurvey(survey)) {
                                return;
                            }

                            return Object.assign(exported, {
                                collectionExercise,
                                collectionInstrumentStatus,
                                survey
                            });
                        }
                    )
                    .share();

                return observable;
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
