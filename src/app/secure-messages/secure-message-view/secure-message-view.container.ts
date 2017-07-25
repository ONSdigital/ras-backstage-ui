import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';
import { NgRedux } from '@angular-redux/store';

import { SecureMessage } from '../shared/secure-message.model';
import { SecureMessagesActions } from '../secure-messages.actions';

import { User } from '../../user/shared/user.model';

import { getDataStoreSecureMessageById } from '../shared/utils';
import { validateProperties } from '../../shared/utils';

@Component({
    template: `
        <ons-secure-message-view
            [user]="user"
            [originalSecureMessage]="originalSecureMessage"
            [(newSecureMessageModel)]="newSecureMessage"
            (mark_message_read_click_handler)="markMessageRead_click_handler($event)"
            (send_reply_click_handler)="sendReply_handler($event)"
            (save_draft_click_handler)="saveDraft_handler($event)"></ons-secure-message-view>
    `,
})
export class SecureMessageViewContainerComponent implements OnInit, OnDestroy {

    public routeParamSubscription: Subscription;
    public secureMessageDataStoreSubscription: Subscription;

    public originalSecureMessage: SecureMessage;
    public newSecureMessage: SecureMessage;
    public user: User;

    constructor(
        private ngRedux: NgRedux<any>,
        private route: ActivatedRoute,
        private router: Router,
        private secureMessagesActions: SecureMessagesActions) {}

    ngOnInit() {

        window.scrollTo(0, 0);

        this.routeParamSubscription = this.route.params
            .subscribe((params: any) => {
                this.subscribeToSecureMessageDataStore(params['secure-message-id']);
            });
    }

    ngOnDestroy() {
        this.routeParamSubscription.unsubscribe();
        this.secureMessageDataStoreSubscription.unsubscribe();
    }

    public subscribeToSecureMessageDataStore (secureMessageId: string) {

        this.secureMessageDataStoreSubscription = this.ngRedux.select(['secureMessages', 'items'])
            .map((secureMessages: any) => secureMessages.find((item: any) => item.msg_id === secureMessageId))
            .subscribe((secureMessage: SecureMessage) => {

                if (secureMessage) {

                    if (!secureMessageHasAgreggateData(secureMessage)) {
                        return;
                    }

                    this.setMessages(secureMessage);
                    this.checkSetMessageIsRead();
                } else {
                    console.log('Secure message with id "' + secureMessageId + '" not found in store.');
                }
            });
    }

    public checkSetMessageIsRead () {

        if (this.originalSecureMessage.labels.find((label: string) => label === 'UNREAD')) {
            this.secureMessagesActions.updateSingleMessageLabels(this.originalSecureMessage.msg_id, {
                label: 'UNREAD',
                action: 'remove'
            });
        }
    }

    public setMessages(originalSecureMessage: SecureMessage) {

        let msgTo: string | Array<any>;

        if (originalSecureMessage.labels.find((label: string) => label === 'SENT')) {
            msgTo = originalSecureMessage.msg_to;
        } else {
            msgTo = [originalSecureMessage.msg_from];
        }

        this.originalSecureMessage = originalSecureMessage;

        /**
         * TOOO - msg_to
         */
        this.newSecureMessage = {
            thread_id: this.originalSecureMessage.thread_id,
            msg_to: msgTo,
            msg_from: '',
            subject: originalSecureMessage.subject,
            body: '',
            collection_case: this.originalSecureMessage.collection_case,
            ru_id: this.originalSecureMessage.ru_id,
            survey: this.originalSecureMessage.survey
        };

        this.ngRedux.select(['user', 'item'])
            .first()
            .subscribe((user: User) => {
                this.newSecureMessage.msg_from = user.id;
                this.user = user;
            });
    }

    public sendReply_handler() {

        if (this.newSecureMessage.body === '') {
            return;
        }

        this.secureMessagesActions.replyToSecureMessage(this.newSecureMessage)
            .subscribe(() => {
                this.router.navigate(['/secure-messages']);
            });
    }

    public saveDraft_handler() {

        if (this.newSecureMessage.body === '') {
            return;
        }

        this.secureMessagesActions.saveDraft(this.newSecureMessage)
            .subscribe(() => {
                this.router.navigate(['/secure-messages']);
            });
    }

    public markMessageRead_click_handler(event: any) {
        event.preventDefault();

        this.secureMessagesActions
            .updateSingleMessageLabels(this.originalSecureMessage.msg_id, {
                label: 'UNREAD',
                action: 'add'
            })
            .subscribe(() => {
                this.router.navigate(['/secure-messages']);
            });

        return false;
    }
}

function secureMessageHasAgreggateData (secureMessage: any): Boolean {

    const failedValidation = validateProperties(secureMessage, [
        { propertyName: '@msg_to' },
        { propertyName: '@msg_from' },
        { propertyName: '@ru_id' }
    ]);

    const checkMsgToExistsInArray: Boolean = secureMessage['@msg_to'] && secureMessage['@msg_to'][0];

    return !(failedValidation || !checkMsgToExistsInArray);
}
