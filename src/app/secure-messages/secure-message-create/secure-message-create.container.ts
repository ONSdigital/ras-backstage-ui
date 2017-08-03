import { Observable } from 'rxjs/Observable';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { PartyService } from '../../party/party.service';
import { Business, Respondent } from '../../party/party.model';

import { SecureMessage } from '../shared/secure-message.model';
import { SecureMessagesActions } from '../secure-messages.actions';

import { UserActions } from '../../user/user.actions';

import { validateProperties } from '../../shared/utils';

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

    public to = '';

    public secureMessage: SecureMessage;

    public getUserSubscription: Subscription;

    private business: Business;
    private respondent: Respondent;

    constructor(
        private router: Router,
        private userActions: UserActions,
        private secureMessagesActions: SecureMessagesActions,
        private partyService: PartyService) {}

    ngOnInit() {
        this.getUserSubscription = this.userActions.getUser()
            .subscribe((user: any) => this.createMessageUpdate(user));
    }

    ngOnDestroy() {
        this.getUserSubscription.unsubscribe();
    }

    public createMessageUpdate (user: any) {

        if (!user) {
            console.log('Logged in user not found');
            return;
        }

        /**
         * TODO
         * Object needs to be passed in
         */
        const secureMessage = {
            msg_to: ['ce12b958-2a5f-44f4-a6da-861e59070a32'], // Respondent // 0a7ad740-10d5-4ecb-b7ca-3c0384afb882
            // msg_to: ['ce12b958-2a5f-44f4-a6da-861e59070a31'], // Internal user
            msg_from: user.id,
            subject: '',
            body: '',
            collection_case: 'ACollectionCase',
            ru_id: 'c614e64e-d981-4eba-b016-d9822f09a4fb',
            survey: 'BRES',
            '@msg_to': [{}],
            '@ru_id': {}
        };

        if (!secureMessageHasAgreggateData(secureMessage)) {
            return;
        }

        this.secureMessage = secureMessage;

        Observable
            .zip(
                this.partyService.getBusiness('3b136c4b-7a14-4904-9e01-13364dd7b972')
                    .share()
                    .map((res: any) => res.json()),
                this.partyService.getRespondent('db036fd7-ce17-40c2-a8fc-932e7c228397')
                    .share()
                    .map((res: any) => res.json()),
                (business: Business, respondent: Respondent) => ({
                    business,
                    respondent
                })
            )
            .share()
            .subscribe((pair: any) => {
                this.business = pair.business;
                this.respondent = pair.respondent;

                this.buildMsgTo();
            });
    }

    public buildMsgTo() {

        /**
         * TODO - validate respondent and business response
         */
        if (!this.business || !this.respondent) {
            return '';
        }

        const businessName = !this.business.name
            ? '(Business name not found)'
            : `${this.business.name}`;

        const businessRef = !this.business.businessRef
            ? '(Business reference not found)'
            : `${this.business.businessRef}`;

        const respondentName = !this.respondent.firstName || !this.respondent.lastName
            ? '(Respondent name not found)'
            : `${this.respondent.firstName} ${this.respondent.lastName}`;

        this.to = `${respondentName} for ${businessName} - ${businessRef}`;
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

function secureMessageHasAgreggateData (secureMessage: any): Boolean {

    const failedValidation = validateProperties(secureMessage, [
        { propertyName: '@msg_to' },
        { propertyName: '@ru_id' }
    ]);

    const checkMsgToExistsInArray: Boolean = secureMessage['@msg_to'] && secureMessage['@msg_to'][0];

    return !(failedValidation || !checkMsgToExistsInArray);
}
