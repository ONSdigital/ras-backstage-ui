import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SecureMessagesActions } from '../secure-messages.actions';
import { NavigationTab } from '../../shared/navigation-tabs/navigation-tab.model';
import { NotificationListItem, NotificationStatus } from '../../shared/system-feedback/system-feedback.model';

@Component({
    template: `
        <h1 class="saturn">Secure messages</h1>
        
        <ons-system-feedback *ngIf="messageSent"
            [notificationListItems]="messageNotifications"></ons-system-feedback>
        
        <ons-navigation-tabs
            [tabs]="navigationTabs"></ons-navigation-tabs>
            
        <ons-secure-messages-list
            [secureMessages]="secureMessagesList"></ons-secure-messages-list>
    `,
})
export class SecureMessagesListContainerComponent implements OnInit {

    public secureMessagesList: Array<any> = [];

    public messageSent: Boolean = false;
    public messageNotifications: Array<any> = [];


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
            label: 'All',
            link: 'all',
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
        private secureMessagesActions: SecureMessagesActions) {}

    ngOnInit() {

        if (this.route.snapshot.data.messageSent) {
            this.messageSent = true;

            this.messageNotifications.push(NotificationListItem.create({
                label: 'Message sent',
                status: NotificationStatus.success
            }));
        }

        this.secureMessagesActions.retrieveAllSecureMessages()
            .subscribe((secureMessages: any) => {
                const messages = secureMessages;

                /**
                 * TODO
                 * Temporary fix until response data returns an array
                 */
                for (const i in messages) {
                    if (messages.hasOwnProperty(i)) {
                        this.secureMessagesList.push(messages[i]);
                    }
                }
            });
    }
}
