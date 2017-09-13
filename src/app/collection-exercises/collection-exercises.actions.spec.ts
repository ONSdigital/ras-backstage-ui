import { Observable } from 'rxjs/Observable';
import { NgReduxModule, NgRedux } from '@angular-redux/store';
import { TestBed, async, inject } from '@angular/core/testing';

import { CollectionExercisesService } from './collection-exercises.service';
import { CollectionExercisesActions } from './collection-exercises.actions';
import { CollectionExercise } from './shared/collection-exercise.model';

import { createMockCollectionExercise } from '../../testing/create_CollectionExercise';

let mockCollectionExerciseService: any,
    mockReduxStore: any,
    mockObservable_response: any,
    successResponse: any = {},
    failResponse = 'Erroring';

const originalLog = console.log;

describe('CollectionExercisesActions', () => {

    beforeEach(() => {

        mockReduxStore = {
            dispatch(action: any) {},
            configureStore() {},
            select() {}
        };

        mockCollectionExerciseService = {
            getCollectionExercise () {
                return mockObservable_response;
            },
            getCollectionExercises () {
                return mockObservable_response;
            }
        };

        spyOn(console, 'log');
        spyOn(mockReduxStore, 'dispatch');
        spyOn(mockCollectionExerciseService, 'getCollectionExercise').and.callThrough();
        spyOn(mockCollectionExerciseService, 'getCollectionExercises').and.callThrough();

        TestBed.configureTestingModule({
            imports: [
                NgReduxModule
            ],
            providers: [
                CollectionExercisesActions,
                { provide: NgRedux, useValue: mockReduxStore },
                { provide: CollectionExercisesService, useValue: mockCollectionExerciseService }
            ]
        });
    });

    afterEach(() => {
        mockCollectionExerciseService = undefined;
        mockObservable_response = undefined;
        mockReduxStore = undefined;
        successResponse = {};
        failResponse = 'Erroring';

        console.log = originalLog;
    });

    describe('retrieveCollectionExercise [method]', () => {

        it('should dispatch ' + CollectionExercisesActions.RETRIEVE_SINGLE  + ' redux action',
            inject([CollectionExercisesActions],
                (collectionExercisesActions: CollectionExercisesActions) => {
                    mockObservable_response = Observable.of({});

                    collectionExercisesActions.retrieveCollectionExercise('100').subscribe();

                    expect(mockReduxStore.dispatch).toHaveBeenCalledWith({
                        type: CollectionExercisesActions.RETRIEVE_SINGLE,
                        id: '100'
                    });
                }));

        it('should call CollectionExercisesService getCollectionExercise method to get a collection exercise',
            inject([CollectionExercisesActions],
                (collectionExercisesActions: CollectionExercisesActions) => {
                    mockObservable_response = Observable.of({});

                    collectionExercisesActions.retrieveCollectionExercise('200').subscribe();

                    expect(mockCollectionExerciseService.getCollectionExercise).toHaveBeenCalledWith('200');
                }));

        describe('after successfully retrieving a collection exercise', () => {

            beforeEach(() => {
                mockObservable_response = Observable.of(successResponse);
            });

            it('should call receivedCollectionExercise',
                inject([CollectionExercisesActions],
                    (collectionExercisesActions: CollectionExercisesActions) => {
                        spyOn(collectionExercisesActions, 'receivedCollectionExercise');

                        collectionExercisesActions.retrieveCollectionExercise('300').subscribe();

                        expect(collectionExercisesActions.receivedCollectionExercise)
                            .toHaveBeenCalledWith(successResponse);
                    }));
        });

        describe('after failing to get a collection exercise', () => {

            beforeEach(() => {
                mockObservable_response = Observable.throw(failResponse);
            });

            it('should log to console',
                inject([CollectionExercisesActions],
                    (collectionExercisesActions: CollectionExercisesActions) => {

                        collectionExercisesActions.retrieveCollectionExercise('400').subscribe(
                            () => {},
                            () => {
                                expect(console.log).toHaveBeenCalledWith(
                                    'Could not dispatch receivedCollectionExercise action, service error: ',
                                    failResponse);
                            }
                        );
                    }));
        });
    });

    describe('receivedCollectionExercise [method]', () => {

        it('should dispatch ' + CollectionExercisesActions.RECEIVED_SINGLE  + ' redux action',
            inject([CollectionExercisesActions],
                (collectionExercisesActions: CollectionExercisesActions) => {
                    const mockCollectionExercise = createMockCollectionExercise('500');

                    collectionExercisesActions.receivedCollectionExercise(mockCollectionExercise);

                    expect(mockReduxStore.dispatch).toHaveBeenCalledWith({
                        type: CollectionExercisesActions.RECEIVED_SINGLE,
                        collectionExercise: mockCollectionExercise
                    });
                }));
    });

    describe('retrieveCollectionExercises [method]', () => {

        it('should dispatch ' + CollectionExercisesActions.RETRIEVE_ALL  + ' redux action',
            inject([CollectionExercisesActions],
                (collectionExercisesActions: CollectionExercisesActions) => {
                    mockObservable_response = Observable.of({});

                    collectionExercisesActions.retrieveCollectionExercises().subscribe();

                    expect(mockReduxStore.dispatch).toHaveBeenCalledWith({
                        type: CollectionExercisesActions.RETRIEVE_ALL,
                    });
                }));

        it('should call CollectionExercisesService getCollectionExercises method to get a list of ' +
            'collection exercises',
            inject([CollectionExercisesActions],
                (collectionExercisesActions: CollectionExercisesActions) => {
                    mockObservable_response = Observable.of({});

                    collectionExercisesActions.retrieveCollectionExercises().subscribe();

                    expect(mockCollectionExerciseService.getCollectionExercises).toHaveBeenCalled();
                }));

        describe('after successfully retrieving a list of collection exercises', () => {

            beforeEach(() => {
                mockObservable_response = Observable.of(successResponse);
            });

            it('should call receivedCollectionExercises',
                inject([CollectionExercisesActions],
                    (collectionExercisesActions: CollectionExercisesActions) => {
                        spyOn(collectionExercisesActions, 'receivedCollectionExercises');

                        collectionExercisesActions.retrieveCollectionExercises().subscribe();

                        expect(collectionExercisesActions.receivedCollectionExercises)
                            .toHaveBeenCalledWith(successResponse);
                    }));
        });

        describe('after failing to get a collection exercise', () => {

            beforeEach(() => {
                mockObservable_response = Observable.throw(failResponse);
            });

            it('should log to console',
                inject([CollectionExercisesActions],
                    (collectionExercisesActions: CollectionExercisesActions) => {

                        collectionExercisesActions.retrieveCollectionExercises().subscribe(
                            () => {},
                            () => {
                                expect(console.log).toHaveBeenCalledWith(
                                    'Could not dispatch receivedCollectionExercises action, service error: ',
                                    failResponse);
                            }
                        );
                    }));
        });
    });

    describe('receivedCollectionExercise [method]', () => {

        it('should dispatch ' + CollectionExercisesActions.RECEIVED_ALL  + ' redux action',
            inject([CollectionExercisesActions],
                (collectionExercisesActions: CollectionExercisesActions) => {
                    const mockCollectionExercises: Array<CollectionExercise> = [
                        createMockCollectionExercise('600'),
                        createMockCollectionExercise('700')
                    ];

                    collectionExercisesActions.receivedCollectionExercises(mockCollectionExercises);

                    expect(mockReduxStore.dispatch).toHaveBeenCalledWith({
                        type: CollectionExercisesActions.RECEIVED_ALL,
                        collectionExercises: mockCollectionExercises
                    });
                }));
    });
});
