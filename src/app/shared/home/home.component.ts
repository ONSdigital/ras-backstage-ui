import {Component} from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
    moduleId: module.id, // For aot compiler relative paths

    templateUrl: 'home.component.html'
})

export class HomeComponent {
    public responseOperationsUrl: string;

    constructor () {
        this.init();
    }

    init() {
        this.responseOperationsUrl = environment.endpoints.responseOperationsApplication;
    }
}
