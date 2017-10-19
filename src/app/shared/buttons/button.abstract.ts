import { Output, EventEmitter } from '@angular/core';

interface Clickable {
    click_handler: EventEmitter<any>;
}

export abstract class ButtonBase implements Clickable {

    @Output() click_handler: EventEmitter<any> = new EventEmitter();

}
