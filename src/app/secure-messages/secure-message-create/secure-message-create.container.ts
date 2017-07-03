import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { SecureMessage } from '../shared/secure-message.model';
import { SecureMessagesActions } from '../secure-messages.actions';

import { UserActions } from '../../user/user.actions';

@Component({
    template: `
        <ons-secure-message-create
            (send_button_click)="sendSecureMessage_handler($event)"
            (save_button_click)="saveDraft_handler($event)"
            [(to)]="to"
            [(subject)]="secureMessage.subject"
            [(body)]="secureMessage.body"></ons-secure-message-create>
    `,
})
export class SecureMessageCreateContainerComponent implements OnInit, OnDestroy {

    public to = 'Vana Oorschot for AOL - 36509908341B';

    public secureMessage: SecureMessage;

    public getUserSubscription: Subscription;

    constructor(
        private router: Router,
        private userActions: UserActions,
        private secureMessagesActions: SecureMessagesActions) {}

    ngOnInit() {
        this.getUserSubscription = this.userActions.getUser()
            .subscribe((user: any) => {

                this.secureMessage = {
                    msg_to: '0a7ad740-10d5-4ecb-b7ca-3c0384afb882',
                    msg_from: user.id,
                    subject: '',
                    body: '',
                    collection_case: 'ACollectionCase',
                    ru_id: 'c614e64e-d981-4eba-b016-d9822f09a4fb',
                    survey: 'BRES'
                };

                if (!user) {
                    console.log('Logged in user not found');
                }
            });
    }

    ngOnDestroy() {
        this.getUserSubscription.unsubscribe();
    }

    public sendSecureMessage_handler() {

        if (!this.isMessageValid()) {
            return;
        }

        this.secureMessagesActions.createSecureMessage(this.secureMessage)
            .subscribe(() => {
                this.router.navigate(['/secure-messages']);
            });
    }

    public saveDraft_handler() {

        if (!this.isMessageValid()) {
            return;
        }

        this.secureMessagesActions.saveDraft(this.secureMessage)
            .subscribe(() => {
                this.router.navigate(['/secure-messages']);
            });
    }

    private isMessageValid() {
        return !(this.secureMessage.subject === '' || this.secureMessage.body === '');
    }
}
