import { Component, Output, Input, EventEmitter } from '@angular/core';

@Component({
    selector: 'ons-site-search',

    templateUrl: 'site-search.component.html'
})
export class SiteSearchComponent {

    @Input() showSearch: Boolean;
    @Input() showMatchIndicator: Boolean;
    @Input() searchEnabled: Boolean;
    @Input() siteSearchUrl: string;

    @Output() searchValueChange: EventEmitter<any> = new EventEmitter();
    @Output() searchClick_handler: EventEmitter<any> = new EventEmitter();

}
