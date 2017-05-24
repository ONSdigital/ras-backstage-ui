import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { SecureMessagesActions } from '../secure-messages.actions';

@Component({
    template: `
        <ons-secure-message-create
            (send_button_click)="sendSecureMessage_handler($event)"></ons-secure-message-create>
    `,
})
export class SecureMessageCreateContainerComponent {

    private respondant: any = {
        id: 'respondent.000000000'
    };
    private onsUser: any = {
        id: 'test'
    };

    constructor(
        private secureMessagesActions: SecureMessagesActions) {}

    public sendSecureMessage_handler() {

        this.secureMessagesActions.createSecureMessage({
            msgTo: this.respondant,
            msgFrom: this.onsUser,
            subject: 'Test subject 2',
            body: 'Test body 2',
            collection_case: 'ACollectionCase',
            reporting_unit: 'AReportingUnit',
            survey: 'bres'
        });
    }
}
