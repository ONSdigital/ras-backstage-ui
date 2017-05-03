import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { BreadcrumbModule } from '../shared/breadcrumb/breadcrumb.module';

import { SecureMessagesRoutingModule } from './secure-messages-routing.module';
import { SecureMessagesComponent } from './secure-messages.component';
import { SecureMessagesListComponent } from './secure-messages-list/secure-messages-list.component';
import { SecureMessagesListContainerComponent } from './secure-messages-list/secure-messages-list.container';
import { SecureMessageCreateComponent } from './secure-message-create/secure-message-create.component';
import { SecureMessageCreateContainerComponent } from './secure-message-create/secure-message-create.container';
import { SecureMessageFormComponent } from './shared/secure-message-form/secure-message-form.component';

@NgModule({
    imports: [
        HttpModule,
        CommonModule,
        RouterModule,
        BreadcrumbModule,

        SecureMessagesRoutingModule
    ],
    declarations: [
        SecureMessagesComponent,
        SecureMessagesListComponent,
        SecureMessagesListContainerComponent,
        SecureMessageCreateComponent,
        SecureMessageCreateContainerComponent,
        SecureMessageFormComponent
    ],
    providers: [
        /*SecureMessagesService,
        SecureMessagesActions*/
    ]
})
export class SecureMessagesModule {}
