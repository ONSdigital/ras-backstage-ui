import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { BreadcrumbModule } from '../shared/breadcrumb/breadcrumb.module';

import { SecureMessagesRoutingModule } from './secure-messages-routing.module';
import { SecureMessages } from './secure-messages.component';
import { SecureMessagesList } from './shared/secure-messages-list/secure-messages-list.component';
import { SecureMessagesListContainer } from './shared/secure-messages-list/secure-messages-list.container';

@NgModule({
    imports: [
        HttpModule,
        CommonModule,
        RouterModule,
        BreadcrumbModule,

        SecureMessagesRoutingModule
    ],
    declarations: [
        SecureMessages,
        SecureMessagesList,
        SecureMessagesListContainer
    ],
    providers: [
        /*SecureMessagesService,
        SecureMessagesActions*/
    ]
})
export class SecureMessagesModule {}
