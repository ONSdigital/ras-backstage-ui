import { Component, OnInit, OnDestroy } from '@angular/core';

import { SecureMessage } from '../shared/secure-message.model';
import { SecureMessagesActions } from '../secure-messages.actions';

@Component({
    template: `
        <ons-secure-message-create
            (send_button_click)="sendSecureMessage_handler($event)"
            [(to)]="to"
            [(subject)]="secureMessage.subject"
            [(body)]="secureMessage.body"></ons-secure-message-create>
    `,
})
export class SecureMessageCreateContainerComponent {

    public to: string = 'Jacky Turner for Bolts and Ratchets Ltd - 36509908341B';

    public secureMessage: SecureMessage = {
        urn_to: 'respondent.000000000',
        urn_from: 'test',
        subject: '',
        body: '',
        collection_case: 'ACollectionCase',
        reporting_unit: 'AReportingUnit',
        survey: 'bres123'
    };

    constructor(
        private secureMessagesActions: SecureMessagesActions) {}

    public sendSecureMessage_handler() {

        if (this.secureMessage.subject === '' || this.secureMessage.body === '') {
            return;
        }

        this.secureMessagesActions.createSecureMessage(this.secureMessage);
    }
}
