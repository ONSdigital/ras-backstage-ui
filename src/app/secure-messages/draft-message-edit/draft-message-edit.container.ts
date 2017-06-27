import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { DraftMessage } from '../shared/secure-message.model';
import { SecureMessagesActions } from '../secure-messages.actions';

@Component({
    template: `
        <ons-draft-message-edit *ngIf="draftMessage"
            (send_button_click)="sendMessage_handler($event)"
            (save_button_click)="saveDraft_handler($event)"
            [(to)]="to"
            [(subject)]="draftMessage.subject"
            [(body)]="draftMessage.body"></ons-draft-message-edit>`
})
export class DraftMessageEditContainerComponent implements OnInit {

    public to = 'Jacky Turner for Bolts and Ratchets Ltd - 36509908341B';

    public draftMessage: DraftMessage;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private secureMessagesActions: SecureMessagesActions) {}

    ngOnInit() {

        if (!this.route.snapshot.data.exported || !this.route.snapshot.data.exported.draftMessage) {
            console.log('Draft message not found in route snapshot data: ', this.route.snapshot.data);
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
