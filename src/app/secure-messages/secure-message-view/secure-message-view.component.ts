import {Component, Output, Input, EventEmitter, OnInit} from '@angular/core';

import { SecureMessage } from '../shared/secure-message.model';

@Component({
    moduleId: module.id,
    selector: 'ons-secure-message-view',
    templateUrl: 'secure-message-view.component.html'
})
export class SecureMessageViewComponent {

    public messageBody: Array<string>;
    public newMessageBody: string;
    public newMessageBodyTest: Array<string>;

    @Input() secureMessageModel: SecureMessage;

    @Output() send_reply_click_handler: EventEmitter<any> = new EventEmitter();

    constructor() {
        this.secureMessageModel = {
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
            links: 'string value'
        };

        this.messageBody = this.secureMessageModel.body.split(/\r\n|\r|\n/g);
    }

    public onTypingReplyTest(event: KeyboardEvent) {
        this.newMessageBodyTest = (<HTMLInputElement>event.target).value.split(/\r\n|\r|\n/g);
        // this.newMessageBodyTest += event.target.value.split(/\r\n|\r|\n/g);
    }
}
