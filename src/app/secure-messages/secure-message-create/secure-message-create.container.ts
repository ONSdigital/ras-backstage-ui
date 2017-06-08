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
            [(to)]="to"
            [(subject)]="secureMessage.subject"
            [(body)]="secureMessage.body"></ons-secure-message-create>
    `,
})
export class SecureMessageCreateContainerComponent implements OnInit, OnDestroy {

    public to = 'Jacky Turner for Bolts and Ratchets Ltd - 36509908341B';

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
                    urn_to: 'respondent.000000000',
                    urn_from: user.id,
                    subject: '',
                    body: '',
                    collection_case: 'ACollectionCase',
                    reporting_unit: 'AReportingUnit',
                    survey: 'bres123'
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

        if (this.secureMessage.subject === '' || this.secureMessage.body === '') {
            return;
        }

        this.secureMessagesActions.createSecureMessage(this.secureMessage)
            .subscribe(() => {
                this.router.navigate(['/secure-messages/message-sent']);
            });
    }
}
