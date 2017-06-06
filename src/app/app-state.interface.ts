import { CollectionExercise } from './collection-exercises/shared/collection-exercise.model';
import { SecureMessage } from './secure-messages/shared/secure-message.model';
import { User } from './user/shared/user.model';

export interface IAppState {
    collectionExercises: {
        isFetching: Boolean,
        items: Array<CollectionExercise>
    };
    secureMessages: {
        isFetching: Boolean,
        items: Array<SecureMessage>
    };
    user: {
        isFetching: Boolean,
        item: User
    };
}
