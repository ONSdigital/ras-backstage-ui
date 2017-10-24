import { Component, OnInit, AfterContentInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { SecureMessagesActions } from '../secure-messages.actions';
import { NavigationTab } from '../../shared/navigation-tabs/navigation-tab.model';
import { PaginationLink } from '../../shared/pagination/pagination-link.model';
import { NotificationListItem, NotificationStatus } from '../../shared/system-feedback/system-feedback.model';
import { SecureMessage } from '../shared/secure-message.model';
import { NgRedux } from '@angular-redux/store';

import { validateProperties, global } from '../../shared/utils';

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

        <ons-pagination
            [links]="paginationLinks"></ons-pagination>
    `,
})
export class SecureMessagesListContainerComponent implements OnInit {

    public secureMessagesList: Array<SecureMessage> = [];
    public secureMessagesLoadingFlag: Boolean = true;

    public paginationLinks: Array<PaginationLink> = [];

    public hasSystemFeedback: Boolean = false;
    public systemNotifications: Array<any> = [];

    public path: string;
    public page: string;

    public rootPathLink = '/secure-messages';

    private labelMap: any = {
        'inbox': 'INBOX',
        'sent': 'SENT',
        'drafts': 'DRAFT'
    };

    public navigationTabs: Array<NavigationTab> = [
        {
            label: 'All',
            link: this.rootPathLink,
            selected: false
        },
        {
            label: 'Inbox',
            link: this.rootPathLink + '/inbox',
            selected: false
        },
        {
            label: 'Sent',
            link: this.rootPathLink + '/sent',
            selected: false
        },
        {
            label: 'Drafts',
            link: this.rootPathLink + '/drafts',
            selected: false
        }
        /*,
        {
            label: 'Create new message',
            link: this.rootPathLink + '/create-message',
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

        this.route.url.map(segments => segments.join(''))
            .subscribe(urlRoute => this.path = urlRoute);

        this.route.queryParams.subscribe(params => {
            this.page = params['page'] || '1';
            this.secureMessagesActions.retrieveAllSecureMessages(this.getLabel(), this.page)
                .subscribe(
                    (res: any) => {
                        this.secureMessageListUpdate(res.messages);
                        this.paginationUpdate(res._links);
                    },
                    (err: any) => console.log('Error: ', err)
                );
        });

        const pathFromRootCopy = Object.assign([], this.route.pathFromRoot);
        const pathSegment = pathFromRootCopy.pop().snapshot.url[0];

        this.path = pathSegment ? pathSegment.path : undefined;
        this.rootPathLink = pathFromRootCopy.map(item => item.snapshot.url[0]).join('/');

        this.updateNavTabs();
    }

    private updateNavTabs () {
        this.navigationTabs.forEach((tab: NavigationTab) => {
            tab['selected'] = !!(
                (!this.path && tab['label'] === 'All') ||
                (this.path && tab['link'].includes(this.path))
            );
        });
    }

    private getLabel(): string {
        return this.labelMap[this.path] || '';
    }

    private paginationUpdate (links: any) {
        let link: string;
        this.paginationLinks = [];

        if (!links) {
            return;
        }

        if (this.path) {
            link = this.rootPathLink + '/' + this.path;
        }

        if ('prev' in links) {
            this.paginationLinks.push({
                label: '< Previous',
                link: link,
                queryParams: { 'page': String(+this.page - 1) }
            });
        }

        if ('next' in links) {
            this.paginationLinks.push({
                label: 'Next >',
                link: link,
                queryParams: { 'page': String(+this.page + 1)}
            });
        }
    }

    private secureMessageListUpdate (secureMessages: any) {

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
