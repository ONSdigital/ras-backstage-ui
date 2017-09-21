import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { Business, Respondent } from '../../party/party.model';

import { SecureMessage } from '../shared/secure-message.model';
import { SecureMessagesActions } from '../secure-messages.actions';

import { UserActions } from '../../user/user.actions';

import { buildMsgTo } from '../shared/utils';
import { validateProperties } from '../../shared/utils';

@Component({
    template: `
        <ons-secure-message-create
            (send_button_click)="sendSecureMessage_handler($event)"
            (save_button_click)="saveDraft_handler($event)"
            [(to)]="to"
            [(subject)]="secureMessage.subject"
            [(body)]="secureMessage.body"
            [(message)]="secureMessage"></ons-secure-message-create>
    `,
})
export class SecureMessageCreateContainerComponent implements OnInit, OnDestroy {

    public to = '';

    public getUserSubscription: Subscription;

    public secureMessage: SecureMessage = {
        msg_to: [],
        msg_from: '',
        subject: '',
        body: '',
        ru_id: '',
        survey: 'BRES',
        '@msg_to': [{}],
        '@ru_id': {}
    };

    private reportingUnit: Business;
    private respondent: Respondent;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private userActions: UserActions,
        private secureMessagesActions: SecureMessagesActions) {}

    ngOnInit() {

        window.scrollTo(0, 0);

        this.getUserSubscription = this.userActions.getUser()
            .subscribe(
                (user: any) => this.createMessageUpdate(user),
                (err: any) => console.log('Error: ', err)
            );
    }

    ngOnDestroy() {
        this.getUserSubscription.unsubscribe();
    }

    public createMessageUpdate (user: any) {

        if (!user) {
            console.log('Logged in user not found');
            return;
        }

        const exported = this.route.snapshot.data.exported;

        if (!exported) {
            console.log('exported data not found on route snapshot');
            return;
        }

        if (!exported.reportingUnit || !exported.respondent) {
            console.log('reportingUnit or respondent not found in exported data: ', exported);
            return;
        }

        /**
         * Validate response data first for properties
         */
        this.reportingUnit = exported.reportingUnit;
        this.respondent = exported.respondent;
        this.to = buildMsgTo(this.reportingUnit, this.respondent);

        const secureMessage = {
            msg_to: [this.respondent.id], // Respondent // ce12b958-2a5f-44f4-a6da-861e59070a32
            // msg_to: ['ce12b958-2a5f-44f4-a6da-861e59070a31'], // Internal user
            msg_from: user.id,
            subject: '',
            body: '',
            ru_id: this.reportingUnit.id,
            survey: 'BRES',
            '@msg_to': [{}],
            '@ru_id': {}
        };

        const respondentCaseId = exported.respondentCaseId;

        if (respondentCaseId) {
            secureMessage['collection_case'] = respondentCaseId;
        }

        this.secureMessageHasAgreggateData(secureMessage);

        this.secureMessage = secureMessage;
    }

    public sendSecureMessage_handler() {

        if (!this.isMessageValid()) {
            return;
        }

        this.secureMessagesActions.createSecureMessage(this.secureMessage)
            .subscribe(
                () => {
                    this.router.navigate(['/secure-messages']);
                },
                (err: any) => {
                    console.log('Error: ', err);
                }
            );
    }

    public saveDraft_handler(event: any) {
        event.preventDefault();

        this.secureMessagesActions.saveDraft(this.secureMessage)
            .subscribe(
                () => {
                    this.router.navigate(['/secure-messages']);
                },
                (err: any) => console.log('Error: ', err)
            );

        return false;
    }

    private isMessageValid() {
        return !(this.secureMessage.subject === '' || this.secureMessage.body === '');
    }

    public secureMessageHasAgreggateData (secureMessage: any): Boolean {

        const failedValidation = validateProperties(secureMessage, [
            { propertyName: '@msg_to' },
            { propertyName: '@ru_id' }
        ]);

        const checkMsgToExistsInArray: Boolean = secureMessage['@msg_to'] && secureMessage['@msg_to'][0];

        return !(failedValidation || !checkMsgToExistsInArray);
    }
}
