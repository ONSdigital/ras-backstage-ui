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
            return state;
        default:
            return state;
    }
}
