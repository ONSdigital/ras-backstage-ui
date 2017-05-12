import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';

import { select, NgRedux } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/defaultIfEmpty';
// import 'rxjs/add/operator/find';
import 'rxjs/add/operator/first'
import 'rxjs/add/operator/concat';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/distinctUntilChanged';

import { CollectionExercise, CollectionExerciseDetailsViewModel } from '../collection-exercise.model';
import { Survey } from '../../../surveys/shared/survey.model';
import { CollectionExercisesActions } from '../../collection-exercises.actions';
import {AnonymousSubject} from "rxjs";

@Injectable()
export class CollectionExerciseDetailsResolver implements Resolve<CollectionExerciseDetailsViewModel> {

    @select(['collectionExercises', 'items'])
    private collectionExercisesItemsStore: AnonymousSubject<any>;
    private collectionExercises: Array<CollectionExercise> = [];

    // private collectionExercisesSubscription: Subscription;

    constructor(
        private ngRedux: NgRedux<any>,
        private http: Http,
        private collectionExercisesActions: CollectionExercisesActions) { }

    resolve(route: ActivatedRouteSnapshot): Observable<any> {

        const id = route.params['collection-exercise-ref'];

        const survey = {
            urn: '500',
            inquiryCode: '221',
            name: 'Business Register and Employment Survey',
            abbr: 'BRES'
        };

        /*const storeCheck: Observable<any> = this.collectionExercisesStore
            .find((collectionExerciseItems: any, index: number) => {
                console.log('store1: ', collectionExerciseItems);

                const ce = collectionExerciseItems.filter((item: CollectionExercise) => {
                    return item.id === id;
                });

                console.log('store2: ', ce);

                if (!!ce.length) {
                    return ce;
                }

                return !!collectionExerciseItems.length;
            });

        Observable
            .concat(
                storeCheck,
                this.http.get('http://localhost:8000/api/' + 'collection-exercise/' + id)
            )
            .do(x => console.log('do: ', x))
            .first()
            .subscribe((val) => {
                console.log('val: ', val);
            });*/

        const observable0: Observable<any> = Observable.of({
                'id': 200,
                'link': 'bres-2016',
                'period': {
                    'type': 'annual',
                    'abbr': '2016',
                    'from': {
                        'day': '01',
                        'month': '01',
                        'year': '2016'
                    },
                    'to': {
                        'day': '01',
                        'month': '01',
                        'year': '2016'
                    }
                },
                'surveyId': '500',
                'collectionInstrumentBundleIds': ['700']
            });

        const cesTemp: Array<CollectionExercise> = [{
            'id': 400,
            'link': 'bres-2016',
            'period': {
                'type': 'annual',
                'abbr': '2016',
                'from': {
                    'day': '01',
                    'month': '01',
                    'year': '2016'
                },
                'to': {
                    'day': '01',
                    'month': '01',
                    'year': '2016'
                }
            },
            'surveyId': '500',
            'collectionInstrumentBundleIds': ['700']
        },
        {
            'id': 500,
            'link': 'bres-2017',
            'period': {
                'type': 'annual',
                'abbr': '2017',
                'from': {
                    'day': '01',
                    'month': '01',
                    'year': '2017'
                },
                'to': {
                    'day': '01',
                    'month': '01',
                    'year': '2017'
                }
            },
            'surveyId': '500',
            'collectionInstrumentBundleIds': ['700']
        }];

        const observable1 = this.collectionExercisesItemsStore
            .asObservable()
            .map((collectionExercises: any) => {

                const collectionExercise = cesTemp.find((item: any) => {
                    console.log(item.link, id);

                    return item.link === id;
                });

                console.log('find: ', collectionExercise);

                return collectionExercise || false;
            })
            /**
             * Make sure this observable from data store completes
             */
            .first();

        const observable3 = (<Subject<any>>this.ngRedux.select<any>(['collectionExercises', 'items']))
            .asObservable()
            .flatMap((collectionExercises: any) => {

                const collectionExercise: CollectionExercise = {
                    'id': 400,
                    'link': 'bres-2016',
                    'period': {
                        'type': 'annual',
                        'abbr': '2016',
                        'from': {
                            'day': '01',
                            'month': '01',
                            'year': '2016'
                        },
                        'to': {
                            'day': '01',
                            'month': '01',
                            'year': '2016'
                        }
                    },
                    'surveyId': '500',
                    'collectionInstrumentBundleIds': ['700']
                };

                return Observable.of(collectionExercise);
            })
            /**
             * Make sure this observable from data store completes
             */
            .first();


        return observable1
            .flatMap((existingCollectionExercise: any) => {
                console.log('condition', !!existingCollectionExercise, observable1);

                return existingCollectionExercise
                    ? Observable.of(existingCollectionExercise)
                    : this.collectionExercisesActions.retrieveCollectionExercise(id);
            })
            .map((collectionExercise: CollectionExercise) => {
                console.log('view model');
                return this.createViewModel(collectionExercise, survey, {});
            });



        /*const observable = this.collectionExercisesActions.retrieveCollectionExercise(id)
            .map((collectionExercise: CollectionExercise) =>
                this.createViewModel(collectionExercise, survey, {})
            );

        return observable;*/




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

    /**
     * Transform data and return view model
     */
    private createViewModel(collectionExercise: CollectionExercise, survey: Survey, collectionInstrument: any):
        CollectionExerciseDetailsViewModel {

        console.log('creating view model from: ', collectionExercise, survey);

        return {
            surveyTitle: survey.name,
            inquiryCode: survey.inquiryCode,
            referencePeriod: 'The period will appear here',
            surveyAbbr: survey.abbr + ' - ' + collectionExercise.period.abbr
        };
    }
}
