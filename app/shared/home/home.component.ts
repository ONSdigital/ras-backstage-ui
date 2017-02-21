import {Component} from '@angular/core';

import {uiComponentDecoratorHelper as cdh} from '../utils';

@Component(cdh({
    filename: __filename
}))
export class Home {
    constructor() {
        console.log(3);
    }
}
