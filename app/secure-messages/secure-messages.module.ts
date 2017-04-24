import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { BreadcrumbModule } from '../shared/breadcrumb/breadcrumb.module';

import { SecureMessagesRoutingModule } from './secure-messages-routing.module';
import { SecureMessages } from './secure-messages.component';

@NgModule({
    imports: [
        HttpModule,
        CommonModule,
        RouterModule,
        BreadcrumbModule,

        SecureMessagesRoutingModule
    ],
    declarations: [
        SecureMessages
    ],
    providers: [
        /*SecureMessagesService,
        SecureMessagesActions*/
    ]
})
export class SecureMessagesModule {}
