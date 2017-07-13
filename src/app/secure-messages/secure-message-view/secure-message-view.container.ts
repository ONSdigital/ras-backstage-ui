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
            [originalSecureMessage]="originalSecureMessage"
            [(newSecureMessageModel)]="newSecureMessage"
            (send_reply_click_handler)="sendReply_handler($event)"></ons-secure-message-view>
    `,
})
export class SecureMessageViewContainerComponent implements OnInit, OnDestroy {

    public routeParamSubscription: Subscription;

    public originalSecureMessage: SecureMessage;
    public newSecureMessage: SecureMessage;

    constructor(
        private ngRedux: NgRedux<any>,
        private route: ActivatedRoute,
        private router: Router,
        private secureMessagesActions: SecureMessagesActions) {}

    ngOnInit() {

        let secureMessageId: string;

        this.routeParamSubscription = this.route.params
            .flatMap((params: any) => {
                secureMessageId = params['secure-message-id'];

                return getDataStoreSecureMessageById(this.ngRedux, secureMessageId);
            })
            .subscribe((secureMessage: SecureMessage) => {

                if (secureMessage) {

                    if (!secureMessageHasAgreggateData(secureMessage)) {
                        return;
                    }

                    this.setMessages(secureMessage);
                    this.secureMessagesActions.updateSingleMessageLabels(secureMessage.msg_id);
                } else {
                    console.log('Secure message with id "' + secureMessageId + '" not found in store.');
                }
            });
    }

    ngOnDestroy() {
        this.routeParamSubscription.unsubscribe();
    }

    public setMessages(originalSecureMessage: SecureMessage) {

        this.originalSecureMessage = originalSecureMessage;

        /**
         * TOOO - msg_to
         */
        this.newSecureMessage = {
            thread_id: this.originalSecureMessage.thread_id,
            msg_to: originalSecureMessage.msg_to[0],
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
