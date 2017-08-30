import { Component, Output, Input, EventEmitter, OnInit } from '@angular/core';

import { User } from '../../user/shared/user.model';
import { SecureMessage } from '../shared/secure-message.model';

@Component({
    moduleId: module.id,
    selector: 'ons-secure-message-view',
    styleUrls: ['secure-message-view.component.scss'],
    templateUrl: 'secure-message-view.component.html'
})
export class SecureMessageViewComponent implements OnInit {

    public originalMessageBody: Array<string> = [];
    public newMessageBody: string;
    public bodyMaxLength = 10000;

    @Input() originalSecureMessage: SecureMessage;
    @Input() newSecureMessageModel: SecureMessage;
    @Input() user: User;

    @Output() send_reply_click_handler: EventEmitter<any> = new EventEmitter();
    @Output() save_draft_click_handler: EventEmitter<any> = new EventEmitter();
    @Output() mark_message_read_click_handler: EventEmitter<any> = new EventEmitter();

    ngOnInit() {
        if (this.originalSecureMessage && this.originalSecureMessage.body) {
            this.originalMessageBody = this.originalSecureMessage.body.split(/\r\n|\r|\n/g);
        }
    }

    public isValid () {
        return !!this.newSecureMessageModel && !!this.newSecureMessageModel.subject && !!this.newSecureMessageModel.body;
    }

    public onTypingReply(event: KeyboardEvent) {
        this.newSecureMessageModel.body = (<HTMLInputElement>event.target).value;
    }

    public getOriginalSecureMessageMsgFrom() {
        return this.originalSecureMessage && this.originalSecureMessage['@msg_from']
            ? this.originalSecureMessage['@msg_from'] : {};
    }

    public getOriginalSecureMessageMsgTo() {
        return this.originalSecureMessage && this.originalSecureMessage['@msg_to'] && this.originalSecureMessage['@msg_to'][0]
            ? this.originalSecureMessage['@msg_to'][0] : {};
    }

    public personLabel (personData: any): string {

        if (!personData.firstName && !personData.lastName) {
            return '(Name not found)';
        }

        return personData.firstName + ' ' + personData.lastName;
    }
}
