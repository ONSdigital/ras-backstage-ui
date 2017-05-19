import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
    template: `
        <h1 class="saturn">Secure messages</h1>
        <ons-navigation-tabs></ons-navigation-tabs>
        <ons-secure-messages-list
            [secureMessages]="secureMessagesList"></ons-secure-messages-list>
    `,
})
export class SecureMessagesListContainerComponent {

    public secureMessagesList: Array<any> = [];

    constructor() {
        this.secureMessagesList = [
            {
                msgId: '123',
                threadId: '212faf46-931f-4170-9b96-949e20722126',
                msgTo: {
                    id: 'urn:ons.gov.uk:id:respondent:001.234.56789',
                    emailAddress: 'richard.weeks@ons.gov.uk',
                    firstName: 'Richard',
                    lastName: 'Weeks'
                },
                msgFrom: {
                    id: 'urn:ons.go.uk:id:ons:001.456.78903',
                    emailAdress: 'tejas.patel@ons.gov.uk',
                    firstName: 'Tejas',
                    lastName: 'Patel'
                },
                subject: 'Survey enquiry',
                body: `Hi Dave,
Thanks for your message. Yes, the figure is right - we had a big expansion last year when we bought The Widgets Group.
Thanks, Jacky`,
                links: 'data source'
            }
        ];
    }

}
