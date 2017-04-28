import { Component, Output, Input, EventEmitter } from '@angular/core';

import { SecureMessage } from '../shared/secure-message.model';

@Component({
    moduleId: module.id,
    selector: 'ons-secure-messages-list',
    templateUrl: './secure-messages-list.component.html'
})
export class SecureMessagesList {

    @Input() secureMessages:Array<SecureMessage>;

}
