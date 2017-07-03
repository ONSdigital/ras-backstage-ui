import { validateProperties } from '../../shared/utils';
import { SecureMessage, DraftMessage } from './secure-message.model';

export function validateSecureMessage (data: SecureMessage): Boolean | Object {
    return validateProperties(data, [
        { propertyName: 'msg_to' },
        { propertyName: 'msg_from' },
        { propertyName: 'subject' },
        { propertyName: 'body' },
        { propertyName: 'ru_id' }
    ]);
}

/*export function validateDraftMessage (data: DraftMessage): Boolean | Object {
    return validateProperties(data, [
        { propertyName: 'msg_to' },
        { propertyName: 'msg_from' },
        { propertyName: 'subject' },
        { propertyName: 'body' },
        { propertyName: 'ru_id' }
    ]);
}*/
