import { Component, Output, Input, EventEmitter, OnInit } from '@angular/core';
import { SecureMessage } from '../../secure-message.model';
import { User } from '../../../../user/shared/user.model';

@Component({
    selector: 'ons-secure-message-conversation-message',
    styleUrls: ['secure-message-conversation-message.component.scss'],
    templateUrl: 'secure-message-conversation-message.component.html'
})
export class SecureMessageConversationMessageComponent implements OnInit {

    public messageBody: Array<string> = [];

    @Input() secureMessage: SecureMessage;
    @Input() me: User;

    @Output() mark_message_read_click_handler: EventEmitter<any> = new EventEmitter();

    ngOnInit() {
        if (this.secureMessage && this.secureMessage.body) {
            this.messageBody = this.secureMessage.body.split(/\r\n|\r|\n/g);
        }
    }

    public getOriginalSecureMessageMsgFrom() {
        return this.secureMessage && this.secureMessage['@msg_from']
            ? this.secureMessage['@msg_from'] : {};
    }

    public getOriginalSecureMessageMsgTo() {
        return this.secureMessage && this.secureMessage['@msg_to'] && this.secureMessage['@msg_to'][0]
            ? this.secureMessage['@msg_to'][0] : {};
    }

    public personLabel (personData: any): string {

        if (!personData.firstName && !personData.lastName) {
            return '(Name not found)';
        }

        return personData.firstName + ' ' + personData.lastName;
    }
}
