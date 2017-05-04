import collectionExerciseReducer from './collection-exercises.reducer';
import { CollectionExercisesActions } from './collection-exercises.actions';

const DEFAULT_STATE: any = {
    isFetching: false,
    items: []
};

function createCollectionExercise () {
    return {
        id: 456,
        period: {
            abbr: '2000'
        },
        survey_ref: '123'
    };
}

describe('Collection exercise reducer', () => {

    describe('when receiving a ' + CollectionExercisesActions.RETRIEVE_SINGLE + ' action type', () => {

        describe('and dispatching a valid action object', () => {

            it(`should return a new state of the collection exercises data store with the new collection 
            exercise added`, () => {
                const collectionExercise = createCollectionExercise(),
                    action = {
                        type: CollectionExercisesActions.RECEIVED_SINGLE,
                        collectionExercise: collectionExercise
                    },
                    result = {
                        isFetching: false,
                        items: [collectionExercise]
                    };

                expect(collectionExerciseReducer(DEFAULT_STATE, action)).toEqual(result);
            });
        });

        describe('and dispatching an invalid action object', () => {

            it('should return the existing state of the collection exercises data store', () => {
                const action = {
                    type: CollectionExercisesActions.RECEIVED_SINGLE,
                    collectionExercise: {}
                };

                expect(collectionExerciseReducer(DEFAULT_STATE, action)).toEqual(DEFAULT_STATE);
            });
        });

    });

});
