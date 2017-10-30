import * as Immutable from 'immutable';

import { State, StateCollection, StateMessageSchema } from '../shared/redux-state.driver';

import { SecureMessage } from './shared/secure-message.model';
import { SecureMessagesActions } from './secure-messages.actions';

import { validateSecureMessage } from './shared/secure-message.model-validation';

export interface SecureMessagesStateSchema extends StateCollection<SecureMessage> {
    stateMessage: StateMessageSchema;
}

/*console.log(State.create({
    stateMessage: 'stateMessage',
    _containerType: 'collection'
}));*/

export default function(
    state: Immutable.Map<string, any> = State.create({
        stateMessage: 'stateMessage',
        _containerType: 'collection'
    }),
    action: any) {

    switch (action.type) {
        case SecureMessagesActions.RECEIVED_SINGLE:

            const secureMessage = action.secureMessage;

            if (!secureMessage) {
                console.log('SecureMessage not found on action: ' + SecureMessagesActions.RECEIVED_SINGLE);
                return state;
            }

            const notValid = validateSecureMessage(secureMessage);

            if (notValid) {
                return state;
            }

            return State.updateCollection(state, 'msg_id', secureMessage);

        case SecureMessagesActions.CREATED_SINGLE:

            if (!isSuccessfulResponse(action)) {
                return state;
            }

            return State.updateDictionary(state, 'stateMessage', <StateMessageSchema>{
                notification: 'Message sent',
                action: {
                    label: 'View message',
                    link: '/secure-messages/message/' + action.payload.json().msg_id
                }
            });

        case SecureMessagesActions.VIEW_ALL:
            return State.updateDictionary(state, 'stateMessage', null);

        case SecureMessagesActions.DRAFT_SAVED:

            if (!isSuccessfulResponse(action)) {
                return state;
            }

            return State.updateDictionary(state, 'stateMessage', <StateMessageSchema>{
                notification: 'Draft saved',
                action: {
                    label: 'View message',
                    link: '/secure-messages/drafts/' + action.payload.json().msg_id
                }
            });

        case SecureMessagesActions.REPLIED_SINGLE:

            if (!isSuccessfulResponse(action)) {
                return state;
            }

            return State.updateDictionary(state, 'stateMessage', <StateMessageSchema>{
                notification: 'Message sent',
                action: {
                    label: 'View message',
                    link: '/secure-messages/message/' + action.payload.json().msg_id
                }
            });

        case SecureMessagesActions.DRAFT_UPDATED:

            if (!isSuccessfulResponse(action)) {
                return state;
            }

            return State.updateDictionary(state, 'stateMessage', <StateMessageSchema>{
                notification: 'Draft saved',
                action: {
                    label: 'View message',
                    link: '/secure-messages/drafts/' + action.payload.json().msg_id
                }
            });

        default:
            return state;
    }
}

export function isSuccessfulResponse (action: any) {

    const payload = action.payload;

    if (!payload ||
        !payload.json) {

        console.log('Payload or json property does not exist on action: ', action);
        return false;
    }

    const payloadJson = payload.json();

    if (!payloadJson) {

        console.log('JSON data undefined in payload: ', action);
        return false;
    }

    if (!payloadJson.msg_id) {

        console.log('msg_id does not exist in JSON data: ', action);
        return false;
    }

    return true;
}
