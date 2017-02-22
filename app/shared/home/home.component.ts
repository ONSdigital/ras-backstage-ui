import {Component} from '@angular/core';

import {uiComponentDecoratorHelper as cdh} from '../utils';

@Component({
    moduleId: module.id, // For aot compiler relative paths

    templateUrl: 'home.component.html'
})
export class Home {
}
