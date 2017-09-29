import { Observable } from 'rxjs/Observable';
import { NgReduxModule, NgRedux } from '@angular-redux/store';
import { TestBed, async, inject } from '@angular/core/testing';
import { ActivatedRouteSnapshot } from '@angular/router';

import { MockActivatedRoute } from '../../../../testing/ActivatedRouteSnapshot_stub';

import { CollectionExerciseModule } from '../../collection-exercises.module';
import { CollectionExerciseDetailsResolver } from './collection-exercise-details.resolver.service';
import { CollectionExercisesActions } from '../../collection-exercises.actions';
import { CollectionInstrumentsService } from '../../../collection-instruments/collection-instruments.service';

import { SurveysActions } from '../../../surveys/surveys.actions';

import { createMockCollectionExercise } from '../../../../testing/create_CollectionExercise';
import { createSurvey_server } from '../../../../testing/create_Survey';

let mockCollectionExercise: any,
    mockSurveyActions: any,
    mockCollectionExercisesActions: any,
    mockCollectionInstrumentsService: any,
    mockCollectionInstrumentBatchPending: any,
    mockSurvey: any,
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

const originalConsoleLog = console.log;

describe('CollectionExerciseDetailsResolver service', () => {

    beforeEach(() => {

        mockSurveyActions = {
            retrieveSurvey: function () {
                return Observable.of({
                    json: function () {
                        return mockSurvey;
                    }
                });
            }
        };

        mockCollectionExercisesActions = {
            retrieveCollectionExercise: function(ref: string) {
                return Observable.of(mockCollectionExercise);
            }
        };

        mockCollectionInstrumentsService = {
            getStatus: function(collectionExerciseId: string) {
                return Observable.of({
                    json: function () {
                        return mockCollectionInstrumentBatchPending;
                    }
                });
            }
        };

        mockReduxStore = {
            dispatch(action: any) {},
            configureStore() {},
            select() {
                return Observable.of(storeData);
            },
        };

        spyOn(console, 'log').and.callThrough();
        spyOn(mockSurveyActions, 'retrieveSurvey').and.callThrough();
        spyOn(mockCollectionExercisesActions, 'retrieveCollectionExercise').and.callThrough();
        spyOn(mockCollectionInstrumentsService, 'getStatus').and.callThrough();

        TestBed.configureTestingModule({
            imports: [
                NgReduxModule,
                CollectionExerciseModule
            ],
            providers: [
                { provide: NgRedux, useValue: mockReduxStore },
                { provide: SurveysActions, useValue: mockSurveyActions },
                { provide: CollectionExercisesActions, useValue: mockCollectionExercisesActions },
                { provide: CollectionInstrumentsService, useValue: mockCollectionInstrumentsService }
            ]
        })
        .compileComponents();
    });

    afterEach(() => {
        storeData = undefined;
        apiData = undefined;
        console.log = originalConsoleLog;
    });

    describe('resolve [method]', () => {

        it('should call the collection exercises data store to look for a collection exercise first', () => {
            mockCollectionExercise = createMockCollectionExercise('100');
            mockCollectionInstrumentBatchPending = createMockCollectionInstrumentBatchPending('100');

            resolverSvc = new CollectionExerciseDetailsResolver(
                mockReduxStore,
                mockSurveyActions,
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

        describe('when a collection exercise is found', () => {

            const collectionExerciseId = '1000';
            const activatedRouteSnapShot: ActivatedRouteSnapshot = new MockActivatedRoute();

            activatedRouteSnapShot.params = {
                'collection-exercise-ref': collectionExerciseId
            };

            beforeEach(() => {
                mockCollectionExercise = createMockCollectionExercise(collectionExerciseId);
                storeData = [createMockCollectionExercise(collectionExerciseId)];
            });

            describe('and collection instrument is found', () => {

                beforeEach(() => {
                    mockCollectionInstrumentBatchPending = createMockCollectionInstrumentBatchPending(
                        collectionExerciseId);
                });

                it('should call the collection instrument service to retrieve collection instrument details',
                    inject([CollectionExerciseDetailsResolver],
                        (collectionExerciseDetailsResolver: CollectionExerciseDetailsResolver) => {
                            collectionExerciseDetailsResolver.resolve(activatedRouteSnapShot).subscribe();

                            expect(mockCollectionInstrumentsService.getStatus).toHaveBeenCalled();
                            expect(mockCollectionInstrumentsService.getStatus).toHaveBeenCalledWith(mockCollectionExercise.id);
                        }));

                it('should call survey actions to get a survey from the service',
                    inject([CollectionExerciseDetailsResolver],
                        (collectionExerciseDetailsResolver: CollectionExerciseDetailsResolver) => {
                            collectionExerciseDetailsResolver.resolve(activatedRouteSnapShot).subscribe();

                            expect(mockSurveyActions.retrieveSurvey).toHaveBeenCalledWith(mockCollectionExercise.surveyId);
                        }));

                describe('when survey is valid', () => {

                    beforeEach(() => {
                        mockSurvey = createSurvey_server();
                    });

                    it('should return exported object on route data',
                        inject([CollectionExerciseDetailsResolver],
                            (collectionExerciseDetailsResolver: CollectionExerciseDetailsResolver) => {
                                collectionExerciseDetailsResolver.resolve(activatedRouteSnapShot).subscribe();

                                expect(mockSurveyActions.retrieveSurvey).toHaveBeenCalledWith(mockCollectionExercise.surveyId);
                            }));
                });

                describe('when survey is not valid', () => {

                    beforeEach(() => {
                        mockSurvey = {
                            rubbishProperty: 'Gibberish'
                        };
                    });

                    it('should return empty exported object',
                        inject([CollectionExerciseDetailsResolver],
                            (collectionExerciseDetailsResolver: CollectionExerciseDetailsResolver) => {
                                collectionExerciseDetailsResolver.resolve(activatedRouteSnapShot)
                                    .subscribe(
                                        (exported: any) => {
                                            expect(exported).toEqual({});
                                        },
                                        () => {}
                                    );
                            }));
                });
            });
        });
    });
});
