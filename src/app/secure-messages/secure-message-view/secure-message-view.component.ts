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
            urn_to: 'respondent.000000000',
            urn_from: 'test',
            subject: 'Survey enquiry',
            body: `Hi Dave,
Thanks for your message. Yes, the figure is right - we had a big expansion last year when we bought The Widgets Group.
Thanks, Jacky`,
            collection_case: 'ACollectionCase',
            reporting_unit: 'AReportingUnit',
            survey: 'bres'
        };

        this.messageBody = this.secureMessageModel.body.split(/\r\n|\r|\n/g);
    }

    public onTypingReplyTest(event: KeyboardEvent) {
        this.newMessageBodyTest = (<HTMLInputElement>event.target).value.split(/\r\n|\r|\n/g);
    }
}
