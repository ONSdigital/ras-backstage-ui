import { Component, Output, Input, EventEmitter } from '@angular/core';
import { SecureMessage } from '../secure-message.model';

@Component({
    moduleId: module.id,
    selector: 'ons-secure-message-form',
    styleUrls: ['secure-message-form.component.scss'],
    templateUrl: 'secure-message-form.component.html'
})
export class SecureMessageFormComponent {

    @Input() to: string;
    @Input() subject: string;
    @Input() body: string;
    @Input() message: SecureMessage;

    @Output() subjectChange: EventEmitter<any> = new EventEmitter();
    @Output() bodyChange: EventEmitter<any> = new EventEmitter();
    @Output() primary_button_click: EventEmitter<any> = new EventEmitter();
    @Output() secondary_button_click: EventEmitter<any> = new EventEmitter();

    public subjectMaxLength = 100;
    public bodyMaxLength = 10000;

    public isValid () {
        return !!this.subject && !!this.body;
    }
}
