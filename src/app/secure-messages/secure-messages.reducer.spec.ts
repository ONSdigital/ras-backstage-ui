import * as Immutable from 'immutable';

import { default as secureMessagesReducer, isSuccessfulResponse } from './secure-messages.reducer';
import { SecureMessagesActions } from './secure-messages.actions';

import { createSecureMessage_server } from '../../testing/create_SecureMessage';
import { SecureMessage } from './shared/secure-message.model';

import { assertStateMaintainedWithinvalidAction } from '../../../testing-utils';

const DEFAULT_STATE: Immutable.Map<string, any> = Immutable.Map({
    isFetching: false,
    stateMessage: null,
    items: Immutable.List([]),
});

function createState (listArr: Array<SecureMessage> = []) {
    return Immutable.Map({
        isFetching: false,
        stateMessage: null,
        items: Immutable.List(listArr),
    });
}

const originalConsoleLog = console.log;

describe('Secure messages reducer', () => {

    beforeEach(() => {
        spyOn(console, 'log').and.callThrough();
    });

    afterEach(() => {
        console.log = originalConsoleLog;
    });

    /**
     * RECEIVED_SINGLE action
     */
    (() => {

        const reducerAction = SecureMessagesActions.RECEIVED_SINGLE;

        describe(reducerAction + ' [action]', () => {

            describe('and receiving a valid action object', () => {

                describe('and secure message does not already exist in store', () => {

                    it('should return a new state of the secure messages data store with the new secure message ' +
                        'model added', () => {
                        const secureMessage1 = createSecureMessage_server('100'),
                            secureMessage2 = createSecureMessage_server('101'),
                            secureMessage3 = createSecureMessage_server('102'),
                            action = {
                                type: reducerAction,
                                secureMessage: secureMessage3
                            };

                        let existingState: any,
                            state: any;

                        existingState = createState([
                            secureMessage1,
                            secureMessage2
                        ]);

                        state = secureMessagesReducer(existingState, action);

                        expect(state.get('isFetching')).toEqual(false);
                        expect(state.get('stateMessage')).toEqual(null);
                        expect(state.get('items').size).toEqual(3);
                    });
                });

                describe('and data for secure message already exists in data store', () => {

                    it('should merge new properties found onto existing secure message object', () => {
                        const secureMessage1 = createSecureMessage_server('100'),
                            secureMessage2 = createSecureMessage_server('101'),
                            secureMessage1_update = createSecureMessage_server('101'),
                            action = {
                                type: SecureMessagesActions.RECEIVED_SINGLE,
                                secureMessage: secureMessage1_update
                            };

                        let existingState: any,
                            state: any;

                        secureMessage1_update.subject = 'A different subject to update message data';

                        existingState = createState([
                            secureMessage1,
                            secureMessage2
                        ]);

                        state = secureMessagesReducer(existingState, action);

                        const newStateItems = state.get('items');

                        expect(state.get('isFetching')).toEqual(false);
                        expect(state.get('stateMessage')).toEqual(null);
                        expect(newStateItems.size).toEqual(2);

                        const newStored = newStateItems.findEntry((item: SecureMessage) =>
                            item.msg_id === action.secureMessage.msg_id);

                        expect(newStored[1]).toEqual(secureMessage1_update);
                    });
                });
            });

            describe('and receiving an invalid action object', () => {

                assertStateMaintainedWithinvalidAction({
                    type: reducerAction,
                    secureMessage: {}
                }, secureMessagesReducer, DEFAULT_STATE);

                assertStateMaintainedWithinvalidAction({
                    type: reducerAction
                }, secureMessagesReducer, DEFAULT_STATE);

                it('should log message not found to console', () => {
                    secureMessagesReducer(DEFAULT_STATE, {
                        type: reducerAction
                    });

                    expect(console.log).toHaveBeenCalledWith('SecureMessage not found on action: ' +
                        reducerAction);
                });
            });
        });
    })();


    /**
     * VIEW_ALL action
     */
    (() => {

        const reducerAction = SecureMessagesActions.VIEW_ALL;

        describe(reducerAction + ' [action]', () => {

            let existingState: any;
            const stateMessage = {
                notification: 'Test notification',
                action: {
                    label: 'Test label',
                    link: '/test-link'
                }
            };

            beforeEach(() => {
                existingState = createState();
                existingState.set('stateMessage', stateMessage);
            });

            it('should clear the stateMessage', () => {
                const action = {
                        type: reducerAction
                    },
                    state: any = secureMessagesReducer(existingState, action);

                expect(state.get('stateMessage')).toEqual(null);
            });
        });
    })();


    /**
     * CREATED_SINGLE action
     */
    (() => {

        const reducerAction = SecureMessagesActions.CREATED_SINGLE;

        describe(reducerAction  + ' [action]', () => {

            describe('and receiving a valid action object', () => {

                assertStateMessageChange('200', reducerAction, {
                    notification: 'Message sent',
                    action: {
                        label: 'View message',
                        link: '/secure-messages/message/200'
                    }
                });
            });

            describe('and receiving an invalid action object', () => {

                assertStateMaintainedWithinvalidAction({
                    type: reducerAction,
                    payload: null
                }, secureMessagesReducer, DEFAULT_STATE);
            });
        });
    })();


    /**
     * DRAFT_SAVED action
     */
    (() => {

        const reducerAction = SecureMessagesActions.DRAFT_SAVED;

        describe(reducerAction  + ' [action]', () => {

            describe('and receiving a valid action object', () => {

                assertStateMessageChange('300', reducerAction, {
                    notification: 'Draft saved',
                    action: {
                        label: 'View message',
                        link: '/secure-messages/drafts/300'
                    }
                });
            });

            describe('and receiving an invalid action object', () => {

                assertStateMaintainedWithinvalidAction({
                    type: reducerAction,
                    payload: null
                }, secureMessagesReducer, DEFAULT_STATE);
            });
        });
    })();


    /**
     * REPLIED_SINGLE action
     */
    (() => {

        const reducerAction = SecureMessagesActions.REPLIED_SINGLE;

        describe(reducerAction  + ' [action]', () => {

            describe('and receiving a valid action object', () => {

                assertStateMessageChange('400', reducerAction, {
                    notification: 'Message sent',
                    action: {
                        label: 'View message',
                        link: '/secure-messages/message/400'
                    }
                });
            });

            describe('and receiving an invalid action object', () => {

                assertStateMaintainedWithinvalidAction({
                    type: reducerAction,
                    payload: null
                }, secureMessagesReducer, DEFAULT_STATE);
            });
        });
    })();


    /**
     * DRAFT_UPDATED action
     */
    (() => {

        const reducerAction = SecureMessagesActions.DRAFT_UPDATED;

        describe(reducerAction  + ' [action]', () => {

            describe('and receiving a valid action object', () => {

                assertStateMessageChange('500', reducerAction, {
                    notification: 'Draft saved',
                    action: {
                        label: 'View message',
                        link: '/secure-messages/drafts/500'
                    }
                });
            });

            describe('and receiving an invalid action object', () => {

                assertStateMaintainedWithinvalidAction({
                    type: reducerAction,
                    payload: null
                }, secureMessagesReducer, DEFAULT_STATE);
            });
        });
    })();


    describe('isSuccessfulResponse [function]', () => {

        describe('when payload object is valid on action', () => {

            it('should return true', () => {
                const action = {
                        type: 'irrelevant here',
                        payload: {
                            json(): any {
                                return createSecureMessage_server('1000');
                            }
                        }
                    },
                    result = isSuccessfulResponse(action);

                expect(result).toEqual(true);
                expect(console.log).not.toHaveBeenCalled();
            });
        });

        describe('when JSON property does not exist in payload', () => {

            it('should return false', () => {
                const action = {
                        type: 'irrelevant here',
                        payload: {}
                    },
                    result = isSuccessfulResponse(action);

                expect(result).toEqual(false);
                expect(console.log).toHaveBeenCalledWith('Payload or json property does not exist on action: ',
                    action);
            });
        });

        describe('when data is not found in from JSON response', () => {

            it('should return false', () => {
                const action = {
                        type: 'irrelevant here',
                        payload: {
                            json(): any {
                                return undefined;
                            }
                        }
                    },
                    result = isSuccessfulResponse(action);

                expect(result).toEqual(false);
                expect(console.log).toHaveBeenCalledWith('JSON data undefined in payload: ',
                    action);
            });
        });

        describe('when data does not include a msg_id property', () => {

            it('should return false', () => {
                const action = {
                        type: 'irrelevant here',
                        payload: {
                            json(): any {
                                return {
                                    subject: 'A subject',
                                    body: 'A body',
                                    messageObjectMalformedWithout_msg_id: true
                                };
                            }
                        }
                    },
                    result = isSuccessfulResponse(action);

                expect(result).toEqual(false);
                expect(console.log).toHaveBeenCalledWith('msg_id does not exist in JSON data: ',
                    action);
            });
        });
    });
});

function assertStateMessageChange (msgId: string, actionConst: string, resultStateMessage: any) {

    it('should return a new state of the secure messages data store with a new statusMessage property added', () => {
        const action = {
                type: actionConst,
                payload: {
                    json: function () {
                        return {
                            msg_id: msgId
                        };
                    }
                }
            },
            state = secureMessagesReducer(DEFAULT_STATE, action);

        expect(state.get('isFetching')).toEqual(false);
        expect(state.get('stateMessage')).toEqual(resultStateMessage);
        expect(state.get('items')).toEqual(Immutable.List([]));
    });
}
