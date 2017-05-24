import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { BreadcrumbModule } from '../shared/breadcrumb/breadcrumb.module';
import { SecureMessagesRoutingModule } from './secure-messages-routing.module';

import { SecureMessagesService } from './secure-messages.service';
import { SecureMessagesActions } from './secure-messages.actions';

import { NavigationTabsComponent } from '../shared/navigation-tabs/navigation-tabs.component';
import { SecureMessagesComponent } from './secure-messages.component';
import { SecureMessagesListComponent } from './secure-messages-list/secure-messages-list.component';
import { SecureMessagesListContainerComponent } from './secure-messages-list/secure-messages-list.container';
import { SecureMessageCreateComponent } from './secure-message-create/secure-message-create.component';
import { SecureMessageViewComponent } from './secure-message-view/secure-message-view.component';
import { SecureMessageViewContainerComponent } from './secure-message-view/secure-message-view.container';
import { SecureMessageCreateContainerComponent } from './secure-message-create/secure-message-create.container';
import { SecureMessageFormComponent } from './shared/secure-message-form/secure-message-form.component';

@NgModule({
    imports: [
        HttpModule,
        CommonModule,
        RouterModule,
        BreadcrumbModule,
        FormsModule,

        SecureMessagesRoutingModule
    ],
    declarations: [
        SecureMessagesComponent,
        SecureMessagesListComponent,
        SecureMessagesListContainerComponent,
        SecureMessageCreateComponent,
        SecureMessageCreateContainerComponent,
        SecureMessageViewComponent,
        SecureMessageViewContainerComponent,
        SecureMessageFormComponent,
        NavigationTabsComponent
    ],
    providers: [
        SecureMessagesService,
        SecureMessagesActions
    ]
})
export class SecureMessagesModule {}
