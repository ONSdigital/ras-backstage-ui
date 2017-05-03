import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { BreadcrumbComponent } from './breadcrumb.component';
import { BreadcrumbContainerComponent } from './breadcrumb.container';

@NgModule({
    imports: [
        CommonModule,
        RouterModule
    ],
    declarations: [
        BreadcrumbComponent,
        BreadcrumbContainerComponent,
    ],
    exports: [
        BreadcrumbComponent,
        BreadcrumbContainerComponent
    ]
})
export class BreadcrumbModule {}
