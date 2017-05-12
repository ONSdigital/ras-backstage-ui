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

// TODO move this?
import { CollectionInstrumentsService } from '../../../collection-instruments/collection-instruments.service';


@Injectable()
export class CollectionExerciseDetailsResolver implements Resolve<CollectionExerciseDetailsViewModel> {

    @select('collectionExercises')
    private collectionExercisesStore: Observable<Array<CollectionExercise>>;
    private collectionExercisesSubscription: Subscription;
    private collectionExercises: Array<CollectionExercise> = [];

    constructor(
        private collectionExercisesActions: CollectionExercisesActions,
        private collectionInstrumentsService: CollectionInstrumentsService) { }

    resolve(route: ActivatedRouteSnapshot): Observable<CollectionExerciseDetailsViewModel> {

        const id = route.params['collection-exercise-ref'];

        // TODO retrieve the survey from service tier rather than hard code
        const survey = {
            urn: '500',
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
            return this.collectionInstrumentsService.getStatus(collectionExercise.urn, collectionExercise.period.abbr)
                .map((res: any) => {
                    return this.createViewModel(collectionExercise, survey, res);
                });
        });

        /*let subject: Observable<CollectionExercise> = this.collectionExercisesStore
            .find((value: Array<CollectionExercise>, index: number) => {
                return true;
            })
            .defaultIfEmpty();*/



        /*let subject: Observable = Observable
            .combineLatest(
                collectionExercisesStore,
                this.collectionExercisesActions.retrieveCollectionExercise(id)
            );*/


        /*let existingCollectionExercise: CollectionExercise;

        this.collectionExercisesStore
            .subscribe((collectionExercises: any) => {
                this.collectionExercises = collectionExercises.items;
            });

        existingCollectionExercise = this.collectionExercises
            .find((collectionExercise: CollectionExercise) => collectionExercise.id === id);

        console.log(existingCollectionExercise);

        if (!existingCollectionExercise) {

        }*/



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

    private buildReferencePeriod(collectionExercise: CollectionExercise) {
        const from = collectionExercise.period.from.day + ' ' + collectionExercise.period.from.month + ' '
            + collectionExercise.period.from.year;
        const to = collectionExercise.period.to.day + ' ' + collectionExercise.period.to.month + ' '
            + collectionExercise.period.to.year;

        return from + ' - ' + to;
    }

    /**
     * Transform data and return view model
     */
    private createViewModel(collectionExercise: CollectionExercise, survey: Survey, collectionInstrumentBatch: any):
        CollectionExerciseDetailsViewModel {

        return {
            surveyTitle: survey.name,
            inquiryCode: survey.inquiryCode,
            referencePeriod: this.buildReferencePeriod(collectionExercise),
            surveyAbbr: survey.abbr + ' - ' + collectionExercise.period.abbr,
            collectionInstrumentBatch: {
                count: collectionInstrumentBatch.count,
                current: collectionInstrumentBatch.current,
                status: collectionInstrumentBatch.status
            }
        };
    }
}
