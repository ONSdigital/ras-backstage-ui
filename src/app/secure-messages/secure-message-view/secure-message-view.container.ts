import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';
import { NgRedux } from '@angular-redux/store';

import { SecureMessage } from '../shared/secure-message.model';
import { SecureMessagesActions } from '../secure-messages.actions';

import { getDataStoreSecureMessageById } from '../shared/utils';

@Component({
    template: `
        <ons-secure-message-view></ons-secure-message-view>
    `,
})
export class SecureMessageViewContainerComponent implements OnInit, OnDestroy {

    public routeParamSubscription: Subscription;

    public originalSecureMessage: SecureMessage;

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
