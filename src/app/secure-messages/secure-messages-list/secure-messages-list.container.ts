import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { SecureMessagesActions } from '../secure-messages.actions';
import { NavigationTab } from "../../shared/navigation-tabs/navigation-tab.model";

@Component({
    template: `
        <h1 class="saturn">Secure messages</h1>
        <ons-navigation-tabs
            [tabs]="navigationTabs"></ons-navigation-tabs>
        <ons-secure-messages-list
            [secureMessages]="secureMessagesList"></ons-secure-messages-list>
    `,
})
export class SecureMessagesListContainerComponent implements OnInit {

    public secureMessagesList: Array<any> = [];

    public navigationTabs: Array<NavigationTab> = [
        {
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
        },
        {
            label: 'All',
            link: 'all',
            selected: false
        },
        {
            label: 'Create new message',
            link: 'create-message',
            type: 'link',
            selected: false
        }
    ];

    constructor(
        private secureMessagesActions: SecureMessagesActions) {}

    ngOnInit() {
        this.secureMessagesActions.retrieveAllSecureMessages()
            .subscribe((res: any) => {
                const messages = res.json().messages;

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
