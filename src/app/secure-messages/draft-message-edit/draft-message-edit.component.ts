import { Component, Input, Output, EventEmitter } from '@angular/core';
import { SecureMessage } from '../shared/secure-message.model';

@Component({
    selector: 'ons-draft-message-edit',
    templateUrl: './draft-message-edit.component.html'
})
export class DraftMessageEditComponent {

    @Input() to: string;
    @Input() subject: string;
    @Input() body: string;
    @Input() message: SecureMessage;

    @Output() subjectChange: EventEmitter<any> = new EventEmitter();
    @Output() bodyChange: EventEmitter<any> = new EventEmitter();
    @Output() send_button_click: EventEmitter<any> = new EventEmitter();
    @Output() save_button_click: EventEmitter<any> = new EventEmitter();

}
