import { Component, Output, Input, EventEmitter } from '@angular/core';
import { SecureMessage } from '../secure-message.model';
import { User } from '../../../user/shared/user.model';

@Component({
    selector: 'ons-secure-message-conversation',
    templateUrl: 'secure-message-conversation.component.html'
})
export class SecureMessageConversationComponent {

    @Input() title: string;
    @Input() secureMessages: Array<SecureMessage>;
    @Input() me: User;

    @Output() mark_message_read_click_handler: EventEmitter<any> = new EventEmitter();

}
