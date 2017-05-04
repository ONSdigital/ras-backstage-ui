import { CollectionExercise } from './collection-exercises/shared/collection-exercise.model';

export interface IAppState {
    collectionExercises: {
        isFetching: Boolean,
        items: Array<CollectionExercise>
    };
}
