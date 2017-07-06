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

            let existingItem: any;

            const secureMessage = action.secureMessage;

            if (!secureMessage) {
                console.log('SecureMessage not found on action: ' + SecureMessagesActions.RECEIVED_SINGLE);
            }

            const notValid = validateSecureMessage(secureMessage);

            if (notValid) {
                return state;
            }

            const items = state.get('items');

            existingItem = items.findEntry((item: SecureMessage) => item.msg_id === secureMessage.msg_id);

            const newItems = items.withMutations((list: any) => {
                existingItem ? list.set(existingItem[0], Object.assign(existingItem[1], secureMessage)) :
                    list.push(secureMessage);
            });

            return Immutable.Map<string, any>({
                isFetching: false,
                stateMessage: null,
                items: newItems
            });
        case SecureMessagesActions.CREATED_SINGLE:

            msgId = action.payload.json().msg_id;

            if (!msgId) {
                return state;
            }

            return Immutable.Map<string, any>({
                isFetching: false,
                stateMessage: {
                    notification: 'Message sent',
                    action: {
                        label: 'View message',
                        link: '/secure-messages/message/' + msgId
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

            msgId = action.payload.json().msg_id;

            if (!msgId) {
                return state;
            }

            return Immutable.Map<string, any>({
                isFetching: false,
                stateMessage: {
                    notification: 'Draft saved',
                    action: {
                        label: 'View message',
                        link: '/secure-messages/drafts/' + msgId
                    }
                },
                items: state.get('items')
            });
        case SecureMessagesActions.REPLIED_SINGLE:

            msgId = action.payload.json().msg_id;

            if (!msgId) {
                return state;
            }

            return Immutable.Map<string, any>({
                isFetching: false,
                stateMessage: {
                    notification: 'Message sent',
                    action: {
                        label: 'View message',
                        link: '/secure-messages/message/' + msgId
                    }
                },
                items: state.get('items')
            });
        case SecureMessagesActions.DRAFT_UPDATED:

            msgId = action.payload.json().msg_id;

            if (!msgId) {
                return state;
            }

            return Immutable.Map<string, any>({
                isFetching: false,
                stateMessage: {
                    notification: 'Draft saved',
                    action: {
                        label: 'View message',
                        link: '/secure-messages/drafts/' + msgId
                    }
                },
                items: state.get('items')
            });
        default:
            return state;
    }
}
