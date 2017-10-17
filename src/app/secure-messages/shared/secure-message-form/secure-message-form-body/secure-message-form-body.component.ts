import { Component, Output, Input, EventEmitter } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'ons-secure-message-form-body',
    styleUrls: ['secure-message-form-body.component.scss'],
    templateUrl: 'secure-message-form-body.component.html'
})
export class SecureMessageFormBodyComponent {

    @Input() bodyText: string;
    @Input() maxLength: Number;
    @Input() fieldLabel: string;

    @Output() bodyTextChange: EventEmitter<any> = new EventEmitter();

}
