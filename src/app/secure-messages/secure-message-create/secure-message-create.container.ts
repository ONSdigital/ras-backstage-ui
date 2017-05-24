import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { SecureMessagesActions } from '../secure-messages.actions';

@Component({
    template: `
        <ons-secure-message-create
            (send_button_click)="sendSecureMessage_handler($event)"
            [(to)]="to"
            [(subject)]="subject"
            [(body)]="body"></ons-secure-message-create>
    `,
})
export class SecureMessageCreateContainerComponent {

    public to: string = 'To: Jacky Turner for Bolts and Ratchets Ltd - 36509908341B';
    public subject: string = '';
    public body: string = '';

    constructor(
        private secureMessagesActions: SecureMessagesActions) {}

    public sendSecureMessage_handler() {
        this.secureMessagesActions.createSecureMessage({
            urn_to: 'respondent.000000000',
            urn_from: 'test',
            subject: this.subject,
            body: this.body,
            collection_case: 'ACollectionCase',
            reporting_unit: 'AReportingUnit',
            survey: 'bres'
        });
    }
}
