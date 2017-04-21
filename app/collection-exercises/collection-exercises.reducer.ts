import { CollectionExercisesActions } from './collection-exercises.actions';
import { CollectionExercise } from './shared/collection-exercise.model';

/**
 * TODO
 * This type could be common pattern
 * @type {{isFetching: boolean; items: Array}}
 */
let INIT_STATE:{ isFetching:Boolean, items:Array<CollectionExercise> } = {
    isFetching: false,
    items: []
};

export default function(state: any = INIT_STATE, action: any) {

    switch(action.type) {
        case CollectionExercisesActions.RECEIVED_SINGLE:
            console.log('Reducer: ', state);

            let existingItem,

                /**
                 * TODO
                 * Below will be a typical pattern for saving/updating data store, should be abstracted.
                 *
                 * Create new items array of collection exercises for new state
                 * @type {Array}
                 */
                items = Object.assign([], state.items.map((collectionExercise:CollectionExercise) => {

                    let obj:CollectionExercise = Object.assign({}, collectionExercise);

                    /**
                     * If an item with same identifier is found, save a reference to its new object for merging data
                     */
                    if(collectionExercise.id === action.collectionExercise.id) {
                        existingItem = obj;
                    }

                    return obj;
                }));

            /**
             * TODO
             * First normalise data to save survey and collection instrument data stores separately, replace entities on
             * collection exercises with references to entities.
             *
             * If there is an existing item, do merge or add to the collectionExercise data store
             */
            existingItem ? Object.assign(existingItem, action.collectionExercise) : items.push(action.collectionExercise);

            return Object.assign({}, state, {
                isFetching: false,
                items: items
            });
        default:
            return state;
    }
}
