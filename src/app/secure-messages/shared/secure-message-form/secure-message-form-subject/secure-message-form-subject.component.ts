import { Component, Output, Input, EventEmitter } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'ons-secure-message-form-subject',
    styleUrls: ['secure-message-form-subject.component.scss'],
    templateUrl: 'secure-message-form-subject.component.html'
})
export class SecureMessageFormSubjectComponent {

    @Input() subjectText: string;
    @Input() maxLength: Number;
    @Input() fieldLabel: string;
    @Input() subjectEditable: Boolean;

    @Output() subjectTextChange: EventEmitter<any> = new EventEmitter();

}
