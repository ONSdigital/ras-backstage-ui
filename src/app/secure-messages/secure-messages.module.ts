import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { BreadcrumbModule } from '../shared/breadcrumb/breadcrumb.module';

import { SecureMessagesRoutingModule } from './secure-messages-routing.module';
import { SecureMessages } from './secure-messages.component';
import { SecureMessagesList } from './secure-messages-list/secure-messages-list.component';
import { SecureMessagesListContainer } from './secure-messages-list/secure-messages-list.container';
import { SecureMessageCreate } from './secure-message-create/secure-message-create.component';
import { SecureMessageCreateContainer } from './secure-message-create/secure-message-create.container';
import { SecureMessageForm } from './shared/secure-message-form/secure-message-form.component';

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
        SecureMessagesListContainer,
        SecureMessageCreate,
        SecureMessageCreateContainer,
        SecureMessageForm
    ],
    providers: [
        /*SecureMessagesService,
        SecureMessagesActions*/
    ]
})
export class SecureMessagesModule {}
