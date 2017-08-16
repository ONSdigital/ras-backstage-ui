import { Component, Output, Input, EventEmitter } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'ons-sign-in',
    templateUrl: 'sign-in.component.html'
})
export class SignInComponent {

    @Input() email: string;
    @Input() password: string;
    @Input() primary_button_enabled: Function;

    @Output() emailChange: EventEmitter<any> = new EventEmitter();
    @Output() passwordChange: EventEmitter<any> = new EventEmitter();
    @Output() primary_button_click: EventEmitter<any> = new EventEmitter();
}
