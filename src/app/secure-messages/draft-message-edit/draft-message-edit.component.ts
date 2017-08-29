import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'ons-draft-message-edit',
    templateUrl: './draft-message-edit.component.html'
})
export class DraftMessageEditComponent {

    @Input() to: string;
    @Input() subject: string;
    @Input() body: string;
    @Input() message: string;

    @Output() subjectChange: EventEmitter<any> = new EventEmitter();
    @Output() bodyChange: EventEmitter<any> = new EventEmitter();
    @Output() send_button_click: EventEmitter<any> = new EventEmitter();
    @Output() save_button_click: EventEmitter<any> = new EventEmitter();

}
