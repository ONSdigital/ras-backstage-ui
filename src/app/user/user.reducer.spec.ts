import { default as userReducer, } from './user.reducer';
import { UserActions } from './user.actions';

import { assertStateMaintainedWithinvalidAction } from '../../../testing-utils';

const DEFAULT_STATE = {
    isFetching: false,
    item: {}
};

describe('User reducer', () => {

    /**
     * RECEIVED_USER action
     */
    (() => {

        const reducerAction = UserActions.RECEIVED_USER;

        describe(reducerAction  + ' [action]', () => {

            describe('and receiving a valid action object', () => {

                it('should return a new state of the user data store with the new user details added', () => {
                    const action = {
                            type: reducerAction,
                            user: {
                                id: '123',
                                firstName: 'Test first name',
                                lastName: 'Test last name'
                            }
                        },
                        state: any = userReducer(DEFAULT_STATE, action);

                    expect(state.isFetching).toEqual(false);
                    expect(state.item).toEqual(action.user);
                });
            });

            describe('and receiving an invalid action object', () => {

                assertStateMaintainedWithinvalidAction({
                    type: reducerAction
                }, userReducer, DEFAULT_STATE);
            });
        });
    })();
});
