import * as Immutable from 'immutable';

import secureMessagesReducer from './secure-messages.reducer';
import { SecureMessagesActions } from './secure-messages.actions';

import { createSecureMessage_server } from '../../testing/create_SecureMessage';

const DEFAULT_STATE: Immutable.Map<string, any> = Immutable.Map({
    isFetching: false,
    stateMessage: null,
    items: Immutable.List([]),
});

describe('Secure messages reducer', () => {

    describe('when receiving a ' + SecureMessagesActions.RECEIVED_SINGLE + ' action type', () => {

        describe('and receiving a valid action object', () => {

            it('should return a new state of the secure messages data store with the new secure message ' +
                'model added', () => {
                const secureMessage = createSecureMessage_server('100'),
                    action = {
                        type: SecureMessagesActions.RECEIVED_SINGLE,
                        secureMessage: secureMessage
                    },
                    state = secureMessagesReducer(DEFAULT_STATE, action);

                expect(state.get('isFetching')).toEqual(false);
                expect(state.get('stateMessage')).toEqual(null);
                expect(state.get('items').findLast(() => true)).toEqual(secureMessage);
            });
        });

        assertStateMaintainedWithinvalidAction({
            type: SecureMessagesActions.RECEIVED_SINGLE,
            secureMessage: {}
        });
    });

    describe('when receiving a ' + SecureMessagesActions.CREATED_SINGLE  + ' action type', () => {

        describe('and receiving a valid action object', () => {

            it('should return a new state of the secure messages data store with a new statusMessage ' +
                'property added', () => {
                const action = {
                        type: SecureMessagesActions.CREATED_SINGLE,
                        payload: {
                            json: function () {
                                return {
                                    msg_id: '200'
                                };
                            }
                        }
                    },
                    resultStateMessage = {
                        notification: 'Message sent',
                        action: {
                            label: 'View message',
                            link: '/secure-messages/message/' + '200'
                        }
                    },
                    state = secureMessagesReducer(DEFAULT_STATE, action);

                expect(state.get('isFetching')).toEqual(false);
                expect(state.get('stateMessage')).toEqual(resultStateMessage);
                expect(state.get('items')).toEqual(Immutable.List([]));
            });
        });

        assertStateMaintainedWithinvalidAction({
            type: SecureMessagesActions.CREATED_SINGLE,
            payload: null
        });
    });
});

function assertStateMaintainedWithinvalidAction (action: any) {

    describe('and receiving an invalid action object', () => {

        it('should return the existing state of the secure message data store', () => {
            expect(secureMessagesReducer(DEFAULT_STATE, action)).toEqual(DEFAULT_STATE);
        });
    });
}
