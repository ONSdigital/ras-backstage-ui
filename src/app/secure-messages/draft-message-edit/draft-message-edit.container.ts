import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { DraftMessage, SecureMessage } from '../shared/secure-message.model';
import { SecureMessagesActions } from '../secure-messages.actions';
import { SecureMessagesService } from '../secure-messages.service';

import { buildMsgTo } from '../shared/utils';
import { CheckBadRequest, HandleCommonRequest, validateProperties, global } from '../../shared/utils';
import { CheckRequestAuthenticated } from '../../authentication/authentication.service';

@Component({
    template: `
        <ons-draft-message-edit *ngIf="draftMessage"
            (send_button_click)="sendMessage_handler($event)"
            (save_button_click)="saveDraft_handler($event)"
            [(to)]="to"
            [(subject)]="draftMessage.subject"
            [(body)]="draftMessage.body"
            [(message)]="draftMessage"></ons-draft-message-edit>`
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

        draftMessageHasAgreggateData(exportedData.draftMessage);

        this.draftMessage = exportedData.draftMessage;
        this.to = buildMsgTo(this.draftMessage['@ru_id'], this.draftMessage['@msg_to'][0]);
    }

    public sendMessage_handler() {

        if (!this.isMessageValid()) {
            return;
        }

        this.actionCreateMessage(this.draftMessage)
            .subscribe(
                () => {
                    this.router.navigate(['/secure-messages']);
                },
                (err: any) => console.log('Error: ', err)
            );
    }

    @CheckBadRequest({
        errorHeading: 'Error creating secure message in secure message service',
        serviceClass: SecureMessagesService
    })
    @CheckRequestAuthenticated()
    @HandleCommonRequest({
        printStatement: 'Create one message'
    })
    private actionCreateMessage(message: SecureMessage) {
        return this.secureMessagesActions.createSecureMessage(message).share();
    }

    public saveDraft_handler(event: any) {
        event.preventDefault();

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

export function draftMessageHasAgreggateData (draftMessage: any): Boolean {

    const failedValidation = validateProperties(draftMessage, [
        { propertyName: '@msg_to' },
        { propertyName: '@ru_id' }
    ]);

    const checkMsgToExistsInArray: Boolean = draftMessage['@msg_to'] && draftMessage['@msg_to'][0];

    if (!checkMsgToExistsInArray) {
        global.validationOutput({
            notification: 'Property @msg_to array empty',
            subject: draftMessage
        });
    }

    return !(failedValidation || !checkMsgToExistsInArray);
}
