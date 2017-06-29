import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SecureMessagesActions } from '../secure-messages.actions';
import { NavigationTab } from '../../shared/navigation-tabs/navigation-tab.model';
import { NotificationListItem, NotificationStatus } from '../../shared/system-feedback/system-feedback.model';
import { PartyService } from '../../party/party.service';
import { SecureMessage } from '../shared/secure-message.model';
import { NgRedux } from '@angular-redux/store';

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
    // private secureMessagesListMapByBusiness: Map<string, Array<SecureMessage>> = new Map<string, [SecureMessage]>();

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
        private partyService: PartyService,
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

        this.secureMessagesActions.retrieveAllSecureMessages()
            .subscribe((secureMessages: any) => {
                const messages = secureMessages;

                /**
                 * TODO
                 * Temporary fix until response data returns an array
                 */
                for (const i in messages) {
                    if (messages.hasOwnProperty(i)) {
                        const message: SecureMessage = messages[i];

                        if (!message.labels) {
                            console.log('labels property missing on msg: ', message);
                        }

                        /**
                         * Attach view-only label
                         */
                        message['$isDraft'] = !!message.labels.find(label => label === 'DRAFT');

                        this.secureMessagesList.push(message);
                    }
                }
            });
    }
}
