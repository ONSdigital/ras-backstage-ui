import { SecureMessage } from './shared/secure-message.model';
import { SecureMessagesActions } from './secure-messages.actions';

const INIT_STATE: { isFetching: Boolean, items: Array<SecureMessage> } = {
    isFetching: false,
    items: []
};

export default function(state: any = INIT_STATE, action: any) {

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
