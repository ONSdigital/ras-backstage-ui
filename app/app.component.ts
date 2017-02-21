import {Component} from '@angular/core';
import {Router} from '@angular/router';

import {uiComponentDecoratorHelper as cdh} from './shared/utils';

@Component(cdh({
    selector: 'my-app',

    filename: __filename
}))
export class AppComponent {
    public path: string = '';

    constructor(private router: Router) {

        console.log(2);

        /**
         * Used to assist Angular Augury
         */
        router.events.subscribe((val) => {
            this.path = val.url;
        });
    }
}
