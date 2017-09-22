import collectionExerciseReducer from './collection-exercises.reducer';
import { CollectionExercisesActions } from './collection-exercises.actions';

import { createMockCollectionExercise } from '../../testing/create_CollectionExercise';

const DEFAULT_STATE: any = {
    isFetching: false,
    items: []
};

const originalConsoleLog = console.log;

describe('Collection exercise reducer', () => {

    beforeEach(() => {
        spyOn(console, 'log').and.callThrough();
    });

    afterEach(() => {
        console.log = originalConsoleLog;
    });

    describe('when receiving a ' + CollectionExercisesActions.RETRIEVE_SINGLE + ' action type', () => {

        describe('and dispatching a valid action object', () => {

            describe('with a collection exercise object that does not exist in state', () => {

                it(`should return a new state of the collection exercises data store with the new collection 
                    exercise added`, () => {

                    const mockCollectionExercise1 = createMockCollectionExercise('100'),
                        mockCollectionExercise2 = createMockCollectionExercise('200'),
                        mockCollectionExercise3 = createMockCollectionExercise('300'),
                        action = {
                            type: CollectionExercisesActions.RECEIVED_SINGLE,
                            collectionExercise: mockCollectionExercise3
                        },
                        result = {
                            isFetching: false,
                            items: [
                                mockCollectionExercise1,
                                mockCollectionExercise2,
                                mockCollectionExercise3
                            ]
                        };

                    const state = Object.assign({}, DEFAULT_STATE);
                    state.items = [
                        mockCollectionExercise1,
                        mockCollectionExercise2
                    ];

                    expect(collectionExerciseReducer(state, action)).toEqual(result);
                });
            });

            describe('with a collection exercise object that already exists in state', () => {

                it('should return a new state of the collection exercises data store with the existing ' +
                    'collection exercise updated', () => {

                    const mockCollectionExercise1_existing = createMockCollectionExercise('100'),
                        mockCollectionExercise1_updated = createMockCollectionExercise('100'),
                        action = {
                            type: CollectionExercisesActions.RECEIVED_SINGLE,
                            collectionExercise: mockCollectionExercise1_updated
                        },
                        result = {
                            isFetching: false,
                            items: [
                                mockCollectionExercise1_updated
                            ]
                        };

                    mockCollectionExercise1_updated.name = '12345678';

                    const state = Object.assign({}, DEFAULT_STATE);
                    state.items = [
                        mockCollectionExercise1_existing
                    ];

                    expect(collectionExerciseReducer(state, action)).toEqual(result);
                });
            });
        });

        describe('and dispatching an invalid action object', () => {

            let action: any;

            beforeEach(() => {
                action = {
                    type: CollectionExercisesActions.RECEIVED_SINGLE,
                    collectionExercise: {}
                };
            });

            describe('with collectionExercise property', () => {

                it('should return the existing state of the collection exercises data store',
                    () => {
                        expect(collectionExerciseReducer(DEFAULT_STATE, action)).toEqual(DEFAULT_STATE);
                    });
            });

            describe('without collectionExercise property', () => {

                it('should log error to console',
                    () => {
                        delete action.collectionExercise;

                        collectionExerciseReducer(DEFAULT_STATE, action);

                        expect(console.log).toHaveBeenCalledWith('CollectionExercise not found on action: ' +
                            CollectionExercisesActions.RECEIVED_SINGLE);
                    });
            });
        });

    });

    /**
     * TODO - Common reducer pattern for checking default case
     */
    describe('when receiving an action that does not match a case', () => {

        let action: any;

        beforeEach(() => {
            action = {
                type: 'invalid action',
                otherProp: 'Some value'
            };
        });

        it('should not modify the state', () => {
            expect(collectionExerciseReducer(DEFAULT_STATE, action)).toEqual(DEFAULT_STATE);
        });
    });
});
