import secureMessagesReducer from './secure-messages.reducer';
import { SecureMessagesActions } from './secure-messages.actions';

import { createSecureMessage_server } from '../../testing/create_SecureMessage';

const DEFAULT_STATE: any = {
    isFetching: false,
    items: [],
    stateMessage: null
};

describe('Secure messages reducer', () => {

    describe('when receiving a ' + SecureMessagesActions.RECEIVED_SINGLE + ' action type', () => {

        describe('and receiving a valid action object', () => {

            it('should return a new state of the secure messages data store with the new secure message ' +
                'model added.', () => {
                const secureMessage = createSecureMessage_server('100'),
                    stateMessage: any = null,
                    action = {
                        type: SecureMessagesActions.RECEIVED_SINGLE,
                        secureMessage: secureMessage
                    },
                    result = {
                        isFetching: false,
                        items: [secureMessage],
                        stateMessage: stateMessage
                    };

                expect(secureMessagesReducer(DEFAULT_STATE, action)).toEqual(result);
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
