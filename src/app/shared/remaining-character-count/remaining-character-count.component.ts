import { Component, Input } from '@angular/core';

@Component({
    selector: 'ons-remaining-character-count',
    templateUrl: 'remaining-character-count.component.html'
})
export class RemainingCharacterCountComponent {

    @Input() maxLength: Number;
    @Input() currentValue: string;

}
