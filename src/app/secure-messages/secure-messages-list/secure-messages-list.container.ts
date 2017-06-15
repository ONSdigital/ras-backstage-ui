import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SecureMessagesActions } from '../secure-messages.actions';
import { NavigationTab } from '../../shared/navigation-tabs/navigation-tab.model';
import { NotificationListItem, NotificationStatus } from '../../shared/system-feedback/system-feedback.model';
import { PartyService } from '../../party/party.service';
import { SecureMessage } from '../shared/secure-message.model';

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

    public secureMessagesList: Array<SecureMessage> = [];
    private secureMessagesListMapByBusiness: Map<string, Array<SecureMessage>> = new Map<string, [SecureMessage]>();

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
                        const message: SecureMessage = messages[i];

                        /**
                         * Attach view-only label
                         */
                        message['$isDraft'] = !!message.labels.find(label => label === 'DRAFT');

                        this.secureMessagesList.push(message);
                        // this.mapMessageByBusinessId(message);
                    }
                }

                // this.fetchBusinesses();
            });
    }

    /*public mapMessageByBusinessId(secureMessage: SecureMessage) {

        let mappingArr: Array<SecureMessage> = [];

        const existingBusinessMapping: Array<SecureMessage> = this.secureMessagesListMapByBusiness
            .get(secureMessage.reporting_unit);

        if (existingBusinessMapping) {
            mappingArr = existingBusinessMapping;
        }

        mappingArr.push(secureMessage);
        this.secureMessagesListMapByBusiness.set(secureMessage.reporting_unit, mappingArr);
    }

    public fetchBusinesses() {

        this.secureMessagesListMapByBusiness.forEach((secureMessages: Array<SecureMessage>, businessId: string) => {

            this.partyService.getBusiness(businessId)
                .subscribe((business: any) => {
                    console.log('business: ', business);

                    this.updateMessagesWithBusiness(business);
                });
        });
    }

    public updateMessagesWithBusiness(business: any) {
        const secureMessages: Array<SecureMessage> = this.secureMessagesListMapByBusiness.get(business.id);

        /!**
         * Rely on message objects being passed by reference.
         *!/
        secureMessages.forEach((secureMessage: SecureMessage) => {
            secureMessage['@reporting_unit'] = business;
        });

        console.log('list: ', this.secureMessagesList);
        console.log(this.secureMessagesListMapByBusiness.get(business.id));
    }*/
}
