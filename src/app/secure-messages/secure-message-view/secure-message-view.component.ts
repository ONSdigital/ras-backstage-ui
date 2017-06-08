import { Component, Output, Input, EventEmitter, OnInit } from '@angular/core';

import { SecureMessage } from '../shared/secure-message.model';

@Component({
    moduleId: module.id,
    selector: 'ons-secure-message-view',
    templateUrl: 'secure-message-view.component.html'
})
export class SecureMessageViewComponent implements OnInit {

    public originalMessageBody: Array<string> = [];
    public newMessageBody: string;
    public newMessageBodyTest: Array<string>;

    @Input() originalSecureMessage: SecureMessage;
    @Input() newSecureMessageModel: SecureMessage;

    @Output() send_reply_click_handler: EventEmitter<any> = new EventEmitter();

    ngOnInit() {
        if (this.originalSecureMessage && this.originalSecureMessage.body) {
            this.originalMessageBody = this.originalSecureMessage.body.split(/\r\n|\r|\n/g);
        }
    }

    public isValid () {
        return !!this.newSecureMessageModel.subject && !!this.newSecureMessageModel.body;
    }

    public onTypingReply(event: KeyboardEvent) {
        this.newSecureMessageModel.body = (<HTMLInputElement>event.target).value;
    }
}
