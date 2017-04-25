import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { Breadcrumb } from './breadcrumb.component';
import { BreadcrumbContainer } from './breadcrumb.container';

@NgModule({
    imports: [
        CommonModule,
        RouterModule
    ],
    declarations: [
        Breadcrumb,
        BreadcrumbContainer,
    ],
    exports: [
        Breadcrumb,
        BreadcrumbContainer
    ]
})
export class BreadcrumbModule {}
