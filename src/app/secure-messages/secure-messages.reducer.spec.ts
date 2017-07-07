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
                'model added.', () => {
                const secureMessage = createSecureMessage_server('100'),
                    action = {
                        type: SecureMessagesActions.RECEIVED_SINGLE,
                        secureMessage: secureMessage
                    };

                expect(secureMessagesReducer(DEFAULT_STATE, action).get('items').findLast(() => true)).toEqual(secureMessage);
            });
        });

        describe('and receiving an invalid action object', () => {

            it('should return the existing state of the secure message data store', () => {
                const action = {
                    type: SecureMessagesActions.RECEIVED_SINGLE,
                    secureMessage: {}
                };

                expect(secureMessagesReducer(DEFAULT_STATE, action)).toEqual(DEFAULT_STATE);
            });
        });
    });
});
