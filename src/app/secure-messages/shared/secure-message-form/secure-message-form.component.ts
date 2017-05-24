import { Component, Output, Input, EventEmitter } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'ons-secure-message-form',
    styleUrls: ['secure-message-form.component.scss'],
    templateUrl: 'secure-message-form.component.html'
})
export class SecureMessageFormComponent {

    @Output() primary_button_click: EventEmitter<any> = new EventEmitter();

}
