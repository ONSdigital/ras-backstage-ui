import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { DraftMessage } from '../shared/secure-message.model';
import { SecureMessagesActions } from '../secure-messages.actions';

@Component({
    template: `
        <ons-draft-message-edit
            (send_button_click)="sendMessage_handler($event)"
            (save_button_click)="saveDraft_handler($event)"
            [(to)]="to"
            [(subject)]="draftMessage.subject"
            [(body)]="draftMessage.body"></ons-draft-message-edit>`
})
export class DraftMessageEditContainerComponent implements OnInit {

    public to = 'Jacky Turner for Bolts and Ratchets Ltd - 36509908341B';

    /**
     * TODO - Get message from route resolved data
     */
    public draftMessage: DraftMessage = {
        urn_to: 'respondent.123',
        urn_from: 'internal.test',
        subject: '',
        body: '',
        collection_case: 'ACollectionCase',
        reporting_unit: '3b136c4b-7a14-4904-9e01-13364dd7b972',
        survey: 'BRES'
    };

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private secureMessagesActions: SecureMessagesActions) {}

    ngOnInit() {

        if (!this.route.snapshot.data.exported || !this.route.snapshot.data.exported.draftMessage) {
            console.log('Draft message not found in route snapshot data.');
            return;
        }

        this.draftMessage = this.route.snapshot.data.exported.draftMessage;

        console.log('Edit draft snapshot data: ', this.route.snapshot.data.exported);
    }

    public sendMessage_handler() {

        if (!this.isMessageValid()) {
            return;
        }

        this.secureMessagesActions.createSecureMessage(this.draftMessage)
            .subscribe(() => {
                this.router.navigate(['/secure-messages']);
            });
    }

    public saveDraft_handler() {

        if (!this.isMessageValid()) {
            return;
        }

        this.secureMessagesActions.updateDraft(this.draftMessage)
            .subscribe(() => {
                this.router.navigate(['/secure-messages']);
            });
    }

    private isMessageValid() {
        return !(this.draftMessage.subject === '' || this.draftMessage.body === '');
    }
}
