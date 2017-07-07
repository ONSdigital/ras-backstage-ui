import { SecureMessage } from './shared/secure-message.model';
import { validateSecureMessage } from './shared/secure-message.model-validation';
import { SecureMessagesActions } from './secure-messages.actions';
import * as Immutable from 'immutable';

const INIT_STATE: Immutable.Map<string, any> = Immutable.Map({
    isFetching: false,
    stateMessage: null,
    items: Immutable.List([])
});

export default function(state: any = INIT_STATE, action: any) {

    let msgId: string;

    switch (action.type) {
        case SecureMessagesActions.RECEIVED_SINGLE:

            const secureMessage = action.secureMessage;

            if (!secureMessage) {
                console.log('SecureMessage not found on action: ' + SecureMessagesActions.RECEIVED_SINGLE);
            }

            const notValid = validateSecureMessage(secureMessage);

            if (notValid) {
                return state;
            }

            const items = state.get('items');

            return Immutable.Map<string, any>({
                isFetching: false,
                stateMessage: null,
                items: items.withMutations((list: any) => {

                    const existingItem = items.findEntry((item: SecureMessage) => item.msg_id === secureMessage.msg_id);

                    existingItem ?
                        list.set(existingItem[0], Object.assign(existingItem[1], secureMessage)) :
                        list.push(secureMessage);
                })
            });
        case SecureMessagesActions.CREATED_SINGLE:

            if (!isSuccessfulResponse(action)) {
                return state;
            }

            return Immutable.Map<string, any>({
                isFetching: false,
                stateMessage: {
                    notification: 'Message sent',
                    action: {
                        label: 'View message',
                        link: '/secure-messages/message/' + action.payload.json().msg_id
                    }
                },
                items: state.get('items')
            });
        case SecureMessagesActions.RECEIVED_ALL:
            return Immutable.Map<string, any>({
                isFetching: false,
                stateMessage: null,
                items: state.get('items')
            });
        case SecureMessagesActions.DRAFT_SAVED:

            if (!isSuccessfulResponse(action)) {
                return state;
            }

            return Immutable.Map<string, any>({
                isFetching: false,
                stateMessage: {
                    notification: 'Draft saved',
                    action: {
                        label: 'View message',
                        link: '/secure-messages/drafts/' + action.payload.json().msg_id
                    }
                },
                items: state.get('items')
            });
        case SecureMessagesActions.REPLIED_SINGLE:

            if (!isSuccessfulResponse(action)) {
                return state;
            }

            return Immutable.Map<string, any>({
                isFetching: false,
                stateMessage: {
                    notification: 'Message sent',
                    action: {
                        label: 'View message',
                        link: '/secure-messages/message/' + action.payload.json().msg_id
                    }
                },
                items: state.get('items')
            });
        case SecureMessagesActions.DRAFT_UPDATED:

            if (!isSuccessfulResponse(action)) {
                return state;
            }

            return Immutable.Map<string, any>({
                isFetching: false,
                stateMessage: {
                    notification: 'Draft saved',
                    action: {
                        label: 'View message',
                        link: '/secure-messages/drafts/' + action.payload.json().msg_id
                    }
                },
                items: state.get('items')
            });
        default:
            return state;
    }
}

function isSuccessfulResponse (action: any) {

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
