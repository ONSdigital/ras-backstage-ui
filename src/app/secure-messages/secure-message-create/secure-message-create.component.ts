import { Component, Output, Input, EventEmitter } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'ons-secure-message-create',
    templateUrl: 'secure-message-create.component.html'
})
export class SecureMessageCreateComponent {

    @Output() send_button_click: EventEmitter<any> = new EventEmitter();

}
