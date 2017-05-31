import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';
import { NgRedux } from '@angular-redux/store';

import { SecureMessage } from '../shared/secure-message.model';
import { SecureMessagesActions } from '../secure-messages.actions';

import { getDataStoreSecureMessageById } from '../shared/utils';

@Component({
    template: `
        <ons-secure-message-view
            [originalSecureMessage]="originalSecureMessage"></ons-secure-message-view>
    `,
})
export class SecureMessageViewContainerComponent implements OnInit, OnDestroy {

    public routeParamSubscription: Subscription;

    public originalSecureMessage: SecureMessage = {
        threadId: '212faf46-931f-4170-9b96-949e20722126',
        msgId: '123',
        urn_to: 'test',
        urn_from: 'respondent.000000000',
        subject: 'BRES 2016 clarification',
        body: `Hi Dave,
Thanks for your message. Yes, the figure is right - we had a big expansion last year when we bought The Widgets Group.
Thanks, Jacky`,
        collection_case: 'ACollectionCase',
        reporting_unit: 'AReportingUnit',
        survey: 'bres',
        sent_date: 'Wed, 31 May 2017 09:08:12 GMT'
    };

    constructor(
        private ngRedux: NgRedux<any>,
        private route: ActivatedRoute,
        private secureMessagesActions: SecureMessagesActions) {}

    ngOnInit() {

        let secureMessageId: string;

        this.routeParamSubscription = this.route.params
            .flatMap((params: any) => {
                secureMessageId = params['id'];

                return getDataStoreSecureMessageById(this.ngRedux, secureMessageId);
            })
            .subscribe((secureMessage: SecureMessage) => {

                if (secureMessage) {
                    console.log('sm container has: ', secureMessage);
                    this.originalSecureMessage = secureMessage;
                } else {
                    console.log('Secure message with id "' + secureMessageId + '" not found in store.');
                }
            });
    }

    ngOnDestroy() {
        this.routeParamSubscription.unsubscribe();
    }
}
