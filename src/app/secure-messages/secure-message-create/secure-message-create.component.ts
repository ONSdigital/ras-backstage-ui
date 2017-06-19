import { Component, Output, Input, EventEmitter } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'ons-secure-message-create',
    templateUrl: 'secure-message-create.component.html'
})
export class SecureMessageCreateComponent {

    @Input() to: string;
    @Input() subject: string;
    @Input() body: string;

    @Output() subjectChange: EventEmitter<any> = new EventEmitter();
    @Output() bodyChange: EventEmitter<any> = new EventEmitter();
    @Output() send_button_click: EventEmitter<any> = new EventEmitter();
    @Output() save_button_click: EventEmitter<any> = new EventEmitter();

}
