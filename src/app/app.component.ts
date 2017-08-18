import {Component} from '@angular/core';
import {Router} from '@angular/router';
import * as moment from 'moment';

@Component({
    selector: 'ons-backstage-ui',
    moduleId: module.id, // For aot compiler relative paths

    // styleUrls: ['app.component.scss'],
    templateUrl: 'app.component.html'
})
export class AppComponent {
    public path = '';

    constructor(
        private router: Router) {

        /**
         * Used to assist Angular Augury
         */
        router.events.subscribe(
            (val) => {
                this.path = val.url;
            },
            () => {});
    }
}
