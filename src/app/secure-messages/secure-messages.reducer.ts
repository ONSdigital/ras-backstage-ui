import { SecureMessage } from './shared/secure-message.model';
import { SecureMessagesActions } from './secure-messages.actions';

const INIT_STATE: { isFetching: Boolean, items: Array<SecureMessage> } = {
    isFetching: false,
    items: []
};

export default function(state: any = INIT_STATE, action: any) {

    switch (action.type) {
        case SecureMessagesActions.RECEIVED_SINGLE:
            console.log('Secure message reducer', state, action);

            let existingItem;

            const secureMessage = action.secureMessage;

            /**
             * TODO
             * Validate secureMessage
             */

            const items = Object.assign([], state.items.map((item: SecureMessage) => {

                const obj: SecureMessage = Object.assign({}, item);

                // If an item with same identifier is found, save a reference to its new object for merging data
                if (item.msg_id === secureMessage.msg_id) {
                    existingItem = obj;
                }

                return obj;
            }));

            existingItem ? Object.assign(existingItem, secureMessage) : items.push(secureMessage);

            return Object.assign({}, state, {
                isFetching: false,
                items: items
            });
        default:
            return state;
    }
}
