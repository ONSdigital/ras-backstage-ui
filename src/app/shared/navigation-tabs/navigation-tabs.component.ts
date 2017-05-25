import { Component, Input } from '@angular/core';
import { NavigationTab } from './navigation-tab.model';

@Component({
    selector: 'ons-navigation-tabs',
    styleUrls: ['navigation-tabs.component.scss'],
    templateUrl: 'navigation-tabs.component.html',
})
export class NavigationTabsComponent {

    @Input() tabs: Array<NavigationTab>;
}
