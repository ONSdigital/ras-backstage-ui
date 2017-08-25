import { Component, Output, Input, EventEmitter } from '@angular/core';

import { SecureMessage } from '../shared/secure-message.model';

@Component({
    moduleId: module.id,
    selector: 'ons-secure-messages-list',
    styleUrls: ['secure-messages-list.component.scss'],
    templateUrl: 'secure-messages-list.component.html'
})
export class SecureMessagesListComponent {

    @Input() secureMessages: Array<SecureMessage>;
    @Input() secureMessagesLoading: Boolean;

    public extractMsgTo (data: any) {

        if (!data) {
            return {};
        }

        return data.length ? data[0] : {};
    }
}
