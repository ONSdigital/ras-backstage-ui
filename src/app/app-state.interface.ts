import * as Immutable from 'immutable';

import { CollectionExercise } from './collection-exercises/shared/collection-exercise.model';
import { User } from './user/shared/user.model';

export interface IAppState {
    collectionExercises: {
        isFetching: Boolean,
        items: Array<CollectionExercise>
    };
    secureMessages: Immutable.Map<string, any>;
    user: {
        isFetching: Boolean,
        item: User
    };
}
