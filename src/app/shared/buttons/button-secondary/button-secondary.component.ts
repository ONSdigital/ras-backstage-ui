import { Component, Input } from '@angular/core';

import { ButtonBase } from '../button.abstract';

@Component({
    selector: 'ons-button-secondary',
    templateUrl: 'button-secondary.component.html'
})
export class ButtonSecondaryComponent extends ButtonBase {

    @Input() label: string;

}
