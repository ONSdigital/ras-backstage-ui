import { SecureMessage } from './shared/secure-message.model';
import { SecureMessagesActions } from './secure-messages.actions';

const INIT_STATE: { isFetching: Boolean, items: Array<SecureMessage>, stateMessage: object } = {
    isFetching: false,
    items: [],
    stateMessage: null
};

export default function(state: any = INIT_STATE, action: any) {

    let msgId: string;

    switch (action.type) {
        case SecureMessagesActions.RECEIVED_SINGLE:

            let existingItem;

            const secureMessage = action.secureMessage;

            if (!secureMessage ||
                !secureMessage.msg_to ||
                !secureMessage.msg_from ||
                !secureMessage.subject ||
                !secureMessage.body ||
                !secureMessage.reporting_unit) {

                return state;
            }

            const items = newItemsState(state.items, (item: SecureMessage) => {

                // If an item with same identifier is found, save a reference to its new object for merging data
                if (item.msg_id === secureMessage.msg_id) {
                    existingItem = item;
                }
            });

            existingItem ? Object.assign(existingItem, secureMessage) : items.push(secureMessage);

            return Object.assign({}, state, {
                isFetching: false,
                stateMessage: null,
                items: items
            });
        case SecureMessagesActions.CREATED_SINGLE:

            msgId = action.payload.json().msg_id;

            if (!msgId) {
                return state;
            }

            return Object.assign({}, state, {
                isFetching: false,
                stateMessage: {
                    notification: 'Message sent',
                    action: {
                        label: 'View message',
                        link: '/secure-messages/message/' + msgId
                    }
                },
                items: newItemsState(state.items)
            });
        case SecureMessagesActions.RECEIVED_ALL:
            return Object.assign({}, state, {
                isFetching: false,
                stateMessage: null,
                items: newItemsState(state.items)
            });
        case SecureMessagesActions.DRAFT_SAVED:

            msgId = action.payload.json().msg_id;

            if (!msgId) {
                return state;
            }

            return Object.assign({}, state, {
                isFetching: false,
                stateMessage: {
                    notification: 'Draft saved',
                    action: {
                        label: 'View message',
                        link: '/secure-messages/drafts/' + msgId
                    }
                },
                items: newItemsState(state.items)
            });
        case SecureMessagesActions.REPLIED_SINGLE:

            msgId = action.payload.json().msg_id;

            if (!msgId) {
                return state;
            }

            return Object.assign({}, state, {
                isFetching: false,
                stateMessage: {
                    notification: 'Message sent',
                    action: {
                        label: 'View message',
                        link: '/secure-messages/message/' + msgId
                    }
                },
                items: newItemsState(state.items)
            });
        default:
            return state;
    }
}

function newItemsState (items: Array<SecureMessage>, iterableCallback: Function = null) {
    return Object.assign([], items.map((item: SecureMessage) => {
        const obj = Object.assign({}, item);

        if (iterableCallback) {
            iterableCallback(obj);
        }
        return obj;
    }));
}
