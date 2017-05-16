import { Observable } from 'rxjs/Observable';
import { NgReduxModule, NgRedux } from '@angular-redux/store';
import { HttpModule } from '@angular/http';
import { TestBed, async, inject } from '@angular/core/testing';
import { ActivatedRouteSnapshot } from '@angular/router';

import { MockActivatedRoute } from '../../../../testing/ActivatedRouteSnapshot_stub';

import { CollectionExerciseModule } from '../../collection-exercises.module';
import { CollectionExerciseDetailsResolver } from './collection-exercise-details-resolver.service';
import { CollectionExercisesActions } from '../../collection-exercises.actions';

let mockCollectionExercisesActions: any,
    resolverSvc: any,
    mockReduxStore: any,
    storeData: any,
    apiData: any;

function createMockCollectionExercise (id: string, link: string) {
    return {
        'id': id,
        'link': link,
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
        'surveyId': '123'
    };
}

describe('CollectionExerciseDetailsResolver service', () => {

    beforeEach(() => {

        mockCollectionExercisesActions = {
            retrieveCollectionExercise: function(ref: string) {
                return Observable.of(apiData);
            }
        };

        mockReduxStore = { // explicitly saying any here is important
            dispatch(action: any) {},
            configureStore() {},
            select() {
                return Observable.of(storeData);
            },
        };

        spyOn(mockCollectionExercisesActions, 'retrieveCollectionExercise').and.callThrough();

        TestBed.configureTestingModule({
            imports: [
                NgReduxModule,
                CollectionExerciseModule
            ],
            providers: [
                { provide: CollectionExercisesActions, useValue: mockCollectionExercisesActions },
                { provide: NgRedux, useValue: mockReduxStore }
            ]
        })
        .compileComponents();
    });

    afterEach(() => {
        storeData = undefined;
        apiData = undefined;
    });

    describe('resolve [method]', () => {

        it('should check the collection exercise data store', () => {
            resolverSvc = new CollectionExerciseDetailsResolver(mockReduxStore, mockCollectionExercisesActions);

            spyOn(mockReduxStore, 'select').and.callThrough();

            resolverSvc.resolve({
                params: {
                    'collection-exercise-ref': 'abc-123'
                }
            });

            expect(mockReduxStore.select).toHaveBeenCalledWith(['collectionExercises', 'items']);
        });

        describe('when a collection exercise does not exist in the store', () => {

            it('should call the collection exercises service to retrieve a collection exercise',
                inject([CollectionExerciseDetailsResolver],
                    (collectionExerciseDetailsResolver: CollectionExerciseDetailsResolver) => {

                        const activatedRouteSnapShot: ActivatedRouteSnapshot = new MockActivatedRoute(),
                            params = {
                                'collection-exercise-ref': 'bres-2016'
                            };

                        activatedRouteSnapShot.params = params;

                        storeData = [];
                        apiData = createMockCollectionExercise('100', 'bres-2016');

                        collectionExerciseDetailsResolver.resolve(activatedRouteSnapShot).subscribe();

                        expect(mockCollectionExercisesActions.retrieveCollectionExercise)
                            .toHaveBeenCalled();
                        expect(mockCollectionExercisesActions.retrieveCollectionExercise)
                            .toHaveBeenCalledWith(params['collection-exercise-ref']);
                    }));
        });

        describe('when a collection exercise does exist in the store', () => {

            it('should not call the collection exercises service',
                inject([CollectionExerciseDetailsResolver],
                    (collectionExerciseDetailsResolver: CollectionExerciseDetailsResolver) => {

                        const activatedRouteSnapShot: ActivatedRouteSnapshot = new MockActivatedRoute(),
                            params = {
                                'collection-exercise-ref': 'bres-2016'
                            };

                        activatedRouteSnapShot.params = params;

                        storeData = [createMockCollectionExercise('100', 'bres-2016')];

                        collectionExerciseDetailsResolver.resolve(activatedRouteSnapShot).subscribe();

                        expect(mockCollectionExercisesActions.retrieveCollectionExercise)
                            .not.toHaveBeenCalled();
                        expect(mockCollectionExercisesActions.retrieveCollectionExercise)
                            .not.toHaveBeenCalledWith(params['collection-exercise-ref']);
                    }));
        });
    });

});
