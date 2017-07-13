import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SecureMessagesActions } from '../secure-messages.actions';
import { NavigationTab } from '../../shared/navigation-tabs/navigation-tab.model';
import { NotificationListItem, NotificationStatus } from '../../shared/system-feedback/system-feedback.model';
import { PartyService } from '../../party/party.service';
import { SecureMessage } from '../shared/secure-message.model';
import { NgRedux } from '@angular-redux/store';

import { validateProperties } from '../../shared/utils';

@Component({
    template: `
        <h1 class="saturn">Secure messages</h1>
        
        <ons-system-feedback *ngIf="hasSystemFeedback"
            [notificationListItems]="systemNotifications"></ons-system-feedback>
        
        <ons-navigation-tabs
            [tabs]="navigationTabs"></ons-navigation-tabs>
            
        <ons-secure-messages-list
            [secureMessages]="secureMessagesList"></ons-secure-messages-list>
    `,
})
export class SecureMessagesListContainerComponent implements OnInit {

    public secureMessagesList: Array<SecureMessage> = [];

    public hasSystemFeedback: Boolean = false;
    public systemNotifications: Array<any> = [];

    public navigationTabs: Array<NavigationTab> = [
        /*{
            label: 'Inbox',
            link: 'inbox',
            selected: true
        },
        {
            label: 'Sent',
            link: 'sent',
            selected: false
        },
        {
            label: 'Drafts',
            link: 'drafts',
            selected: false
        },*/
        {
            label: 'All messages',
            link: '/secure-messages/all',
            selected: true
        },
        {
            label: 'Create new message',
            link: '/secure-messages/create-message',
            type: 'link',
            selected: false
        }
    ];

    constructor(
        private route: ActivatedRoute,
        private ngRedux: NgRedux<any>,
        private secureMessagesActions: SecureMessagesActions) {}

    ngOnInit() {

        this.ngRedux.select(['secureMessages', 'stateMessage'])
            .first()
            .subscribe((stateMessage: any) => {
                if (!stateMessage) {
                    return;
                }

                this.hasSystemFeedback = true;

                this.systemNotifications.push(NotificationListItem.create({
                    label: stateMessage.notification,
                    action: stateMessage.action,
                    status: NotificationStatus.success
                }));
            });

        this.secureMessagesActions.viewAllMessages();

        this.secureMessagesActions.retrieveAllSecureMessages()
            .subscribe((secureMessages: any) => {

                if (!secureMessages) {
                    return;
                }

                this.secureMessagesList = secureMessages.map((secureMessage: SecureMessage) => {

                    if (!secureMessage.labels) {
                        console.log('labels property missing on msg: ', secureMessage);
                    }

                    /**
                     * Attach view-only label
                     */
                    secureMessage['$isDraft'] = !!secureMessage.labels.find(label => label === 'DRAFT');

                    if (!messageHasAgreggateData(secureMessage)) {
                        return false;
                    }

                    return secureMessage;
                });
            });
    }
}

function messageHasAgreggateData (message: any): Boolean {

    const failedValidation = validateProperties(message, [
        { propertyName: '@msg_to' },
        { propertyName: '@msg_from' },
        { propertyName: '@ru_id' }
    ]);

    const checkMsgToExistsInArray: Boolean = message['@msg_to'] && message['@msg_to'][0];

    return !(failedValidation || !checkMsgToExistsInArray);
}
