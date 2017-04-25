import { Component, Input } from '@angular/core';

import { BreadcrumbItem } from './breadcrumb-item.model';

@Component({
    moduleId: module.id, // For aot compiler relative paths
    selector: 'ons-breadcrumb',

    //styleUrls: ['breadcrumb.component.css'],
    templateUrl: 'breadcrumb.component.html'
})
export class Breadcrumb {

    @Input() trail:Array<BreadcrumbItem>;

}
