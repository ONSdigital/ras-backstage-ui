import { Component, Input } from '@angular/core';

import { ButtonBase } from '../button.abstract';

@Component({
    selector: 'ons-button-primary',
    templateUrl: 'button-primary.component.html'
})
export class ButtonPrimaryComponent extends ButtonBase {

    @Input() label: string;

}
