import { Observable } from 'rxjs/Observable';
import { NgReduxModule, NgRedux } from '@angular-redux/store';
import { TestBed, async, inject } from '@angular/core/testing';
import { ActivatedRouteSnapshot } from '@angular/router';

import { MockActivatedRoute } from '../../../../testing/ActivatedRouteSnapshot_stub';

import { CollectionExerciseModule } from '../../collection-exercises.module';
import { CollectionExerciseDetailsResolver } from './collection-exercise-details-resolver.service';
import { CollectionExercisesActions } from '../../collection-exercises.actions';

import { createMockCollectionExercise } from '../../../../testing/create_CollectionExercise';

let mockCollectionExercise: any,
    mockCollectionExercisesActions: any,
    mockCollectionInstrumentsService: any,
    mockCollectionInstrumentBatchPending: any,
    resolverSvc: any,
    mockReduxStore: any,
    storeData: any,
    apiData: any;

function createMockCollectionInstrumentBatchPending(ceRef: string) {
    return {
        id: ceRef,
        current: 0,
        status: 'pending'
    };
}

describe('CollectionExerciseDetailsResolver service', () => {

    beforeEach(() => {

        mockCollectionExercisesActions = {
            retrieveCollectionExercise: function(ref: string) {
                return Observable.of(
                    mockCollectionExercise
                );
            }
        };

        mockCollectionInstrumentsService = {
            getStatus: function(collectionExerciseId: string) {
                return Observable.of(
                    mockCollectionInstrumentBatchPending
                );
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

        it('should call the collection exercises service to retrieve a collection exercise', () => {
            mockCollectionExercise = createMockCollectionExercise('100');
            mockCollectionInstrumentBatchPending = createMockCollectionInstrumentBatchPending('100');

            resolverSvc = new CollectionExerciseDetailsResolver(
                mockReduxStore,
                mockCollectionExercisesActions,
                mockCollectionInstrumentsService);

            spyOn(mockReduxStore, 'select').and.callThrough();

            resolverSvc.resolve({
                params: {
                    'collection-exercise-ref': '100'
                }
            });

            expect(mockReduxStore.select).toHaveBeenCalledWith(['collectionExercises', 'items']);
        });
    });

    describe('when a collection exercise does not exist in the store', () => {

        it('should call the collection exercises service to retrieve a collection exercise',
            inject([CollectionExerciseDetailsResolver],
                (collectionExerciseDetailsResolver: CollectionExerciseDetailsResolver) => {
                    mockCollectionExercise = createMockCollectionExercise('200');
                    mockCollectionInstrumentBatchPending = createMockCollectionInstrumentBatchPending('200');

                    const activatedRouteSnapShot: ActivatedRouteSnapshot = new MockActivatedRoute(),
                        params = {
                            'collection-exercise-ref': '200'
                        };

                    activatedRouteSnapShot.params = params;

                    storeData = [];
                    apiData = createMockCollectionExercise('200');

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
                    mockCollectionExercise = createMockCollectionExercise('225');
                    mockCollectionInstrumentBatchPending = createMockCollectionInstrumentBatchPending('225');

                    const activatedRouteSnapShot: ActivatedRouteSnapshot = new MockActivatedRoute(),
                        params = {
                            'collection-exercise-ref': '225'
                        };

                    activatedRouteSnapShot.params = params;

                    storeData = [createMockCollectionExercise('225')];

                    collectionExerciseDetailsResolver.resolve(activatedRouteSnapShot).subscribe();

                    expect(mockCollectionExercisesActions.retrieveCollectionExercise)
                        .not.toHaveBeenCalled();
                    expect(mockCollectionExercisesActions.retrieveCollectionExercise)
                        .not.toHaveBeenCalledWith(params['collection-exercise-ref']);
                }));
    });

    it('should call the collection instrument service to retrieve collection instrument details', () => {
        mockCollectionExercise = createMockCollectionExercise('250');
        mockCollectionInstrumentBatchPending = createMockCollectionInstrumentBatchPending('250');

        resolverSvc = new CollectionExerciseDetailsResolver(
            mockReduxStore,
            mockCollectionExercisesActions,
            mockCollectionInstrumentsService);

        spyOn(mockCollectionInstrumentsService, 'getStatus').and.callThrough();

        resolverSvc.resolve({
            params: {
                'collectionExerciseId': mockCollectionExercise.id
            }
        });

        // TODO fix this
        // expect(mockCollectionInstrumentsService.getStatus).toHaveBeenCalled();
        // expect(mockCollectionInstrumentsService.getStatus).toHaveBeenCalledWith(mockCollectionExercise.id);
    });

    describe('Helper methods', () => {
        it('should correctly format a collection exercise reference period', () => {
            expect(CollectionExerciseDetailsResolver.buildReferencePeriod(mockCollectionExercise))
                .toEqual('1 Jun 2017 - 31 Dec 2017');
        });
    });
});
