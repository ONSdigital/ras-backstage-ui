import {Component} from '@angular/core';
import {Router} from '@angular/router';

//import {uiComponentDecoratorHelper as cdh} from './shared/utils';

@Component({
    selector: 'my-app',
    moduleId: module.id, // For aot compiler relative paths

    templateUrl: 'app.component.html',
    styleUrls: ['app.component.css']
})
export class AppComponent {
    public path: string = '';

    constructor(private router: Router) {

        /**
         * Used to assist Angular Augury
         */
        router.events.subscribe((val) => {
            this.path = val.url;
        });
    }
}
