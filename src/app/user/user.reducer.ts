import { UserActions } from './user.actions';
import { User } from './shared/user.model';

const INIT_STATE: { isFetching: Boolean, item: User } = {
    isFetching: false,
    item: null
};

export default function(state: any = INIT_STATE, action: any) {

    switch (action.type) {
        case UserActions.RECEIVED_USER:

            const user = action.user;

            if (!user) {
                return state;
            }

            return Object.assign({}, state, {
                item: user
            });

        default:
            return state;
    }
}
