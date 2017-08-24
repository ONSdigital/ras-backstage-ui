import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { DraftMessage } from '../shared/secure-message.model';
import { SecureMessagesActions } from '../secure-messages.actions';

import { buildMsgTo } from '../shared/utils';
import { validateProperties } from '../../shared/utils';

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

    public to: string;

    public draftMessage: DraftMessage;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private secureMessagesActions: SecureMessagesActions) {}

    ngOnInit() {

        window.scrollTo(0, 0);

        this.draftMessageUpdate(this.route.snapshot.data.exported);
    }

    private draftMessageUpdate (exportedData: any) {

        if (!exportedData || !exportedData.draftMessage) {
            console.log('Draft message not found in route snapshot data: ', this.route.snapshot.data);
            return;
        }

        if (!draftMessageHasAgreggateData(exportedData.draftMessage)) {
            return;
        }

        this.draftMessage = exportedData.draftMessage;
        this.to = buildMsgTo(this.draftMessage['@ru_id'], this.draftMessage['@msg_to'][0]);
    }

    public sendMessage_handler() {

        if (!this.isMessageValid()) {
            return;
        }

        this.secureMessagesActions.createSecureMessage(this.draftMessage)
            .subscribe(
                () => {
                    this.router.navigate(['/secure-messages']);
                },
                (err: any) => console.log('Error: ', err)
            );
    }

    public saveDraft_handler() {
        event.preventDefault();

        /*if (!this.isMessageValid()) {
            return;
        }*/

        this.secureMessagesActions.updateDraft(this.draftMessage)
            .subscribe(
                () => {
                    this.router.navigate(['/secure-messages']);
                },
                (err: any) => console.log('Error: ', err)
            );

        return false;
    }

    private isMessageValid() {
        return !(this.draftMessage.subject === '' || this.draftMessage.body === '');
    }
}

function draftMessageHasAgreggateData (draftMessage: any): Boolean {

    const failedValidation = validateProperties(draftMessage, [
        { propertyName: '@msg_to' },
        { propertyName: '@ru_id' }
    ]);

    const checkMsgToExistsInArray: Boolean = draftMessage['@msg_to'] && draftMessage['@msg_to'][0];

    return !(failedValidation || !checkMsgToExistsInArray);
}
