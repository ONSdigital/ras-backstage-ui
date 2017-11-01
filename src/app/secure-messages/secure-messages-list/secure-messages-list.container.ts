import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgRedux } from '@angular-redux/store';

import { SecureMessagesActions } from '../secure-messages.actions';
import { SecureMessagesService } from '../secure-messages.service';
import { NavigationTab } from '../../shared/navigation-tabs/navigation-tab.model';
import { NotificationListItem, NotificationStatus } from '../../shared/system-feedback/system-feedback.model';
import { SecureMessage } from '../shared/secure-message.model';

import { CheckBadRequest, HandleCommonRequest, validateProperties, global } from '../../shared/utils';
import { CheckRequestAuthenticated } from '../../authentication/authentication.service';

@Component({
    template: `
        <h1 class="saturn">Secure messages</h1>
        
        <ons-system-feedback *ngIf="hasSystemFeedback"
            [notificationListItems]="systemNotifications"></ons-system-feedback>
        
        <ons-navigation-tabs
            [tabs]="navigationTabs"></ons-navigation-tabs>
            
        <ons-secure-messages-list
            [secureMessagesLoading]="secureMessagesLoadingFlag"
            [secureMessages]="secureMessagesList"></ons-secure-messages-list>
    `,
})
export class SecureMessagesListContainerComponent implements OnInit {

    public secureMessagesList: Array<SecureMessage> = [];
    public secureMessagesLoadingFlag: Boolean = true;

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
            link: '/secure-messages',
            selected: true
        }/*,
        {
            label: 'Create new message',
            link: '/secure-messages/create-message',
            queryParams: {
                respondent: 'db036fd7-ce17-40c2-a8fc-932e7c228397',
                reporting_unit: '3b136c4b-7a14-4904-9e01-13364dd7b973'
            },
            type: 'link',
            selected: false
        }*/
    ];

    constructor(
        private route: ActivatedRoute,
        private ngRedux: NgRedux<any>,
        private secureMessagesActions: SecureMessagesActions) {}

    ngOnInit() {

        window.scrollTo(0, 0);

        this.ngRedux.select(['secureMessages', 'stateMessage'])
            .first()
            .subscribe(
                (stateMessage: any) => this.stateMessageUpdate(stateMessage),
                (err: any) => console.log('Error: ', err)
            );

        this.secureMessagesActions.viewAllMessages();

        this.serviceGetAllMessages()
            .subscribe(
                (secureMessages: any) => this.secureMessageListUpdate(secureMessages),
                (err: any) => console.log('Error: ', err)
            );
    }

    @CheckBadRequest({
        errorHeading: 'Error getting a list of secure messages from the secure message service',
        serviceClass: SecureMessagesService
    })
    @CheckRequestAuthenticated()
    @HandleCommonRequest({
        printStatement: 'Get all messages'
    })
    private serviceGetAllMessages () {
        return this.secureMessagesActions.retrieveAllSecureMessages().share();
    }

    private secureMessageListUpdate (secureMessages: any) {

        window.scrollTo(0, 0);

        if (!secureMessages) {
            return;
        }

        this.secureMessagesLoadingFlag = false;

        this.secureMessagesList = secureMessages.map((secureMessage: SecureMessage) => {

            if (!secureMessage.labels) {
                console.log('labels property missing on msg: ', secureMessage);
            } else {

                /**
                 * Attach view-only label
                 */
                secureMessage['$isDraft'] = !!secureMessage.labels.find(label => label === 'DRAFT');
                secureMessage['$isUnread'] = !!secureMessage.labels.find(label => label === 'UNREAD');
            }

            messageHasAgreggateData(secureMessage);

            return secureMessage;
        });
    }

    private stateMessageUpdate (stateMessage: any) {

        if (!stateMessage) {
            return;
        }

        this.hasSystemFeedback = true;

        this.systemNotifications.push(NotificationListItem.create({
            label: stateMessage.notification,
            action: stateMessage.action,
            status: NotificationStatus.success
        }));
    }
}

export function messageHasAgreggateData (message: any): Boolean {

    const failedValidation = validateProperties(message, [
        { propertyName: '@msg_to' },
        { propertyName: '@msg_from' },
        { propertyName: '@ru_id' }
    ]);

    const checkMsgToExistsInArray: Boolean = message['@msg_to'] && message['@msg_to'][0];

    if (!checkMsgToExistsInArray) {
        global.validationOutput({
            notification: 'Property @msg_to array empty',
            subject: message
        });
    }

    return !(failedValidation || !checkMsgToExistsInArray);
}
