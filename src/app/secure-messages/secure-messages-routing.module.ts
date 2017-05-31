import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SecureMessagesComponent } from './secure-messages.component';
import { SecureMessagesListContainerComponent } from './secure-messages-list/secure-messages-list.container';
import { SecureMessageCreateContainerComponent } from './secure-message-create/secure-message-create.container';
import { SecureMessageViewContainerComponent } from './secure-message-view/secure-message-view.container';
import { SecureMessageViewResolver } from './secure-message-view/secure-message-view.resolver.service';

const SecureMessagesRoutes: Routes = [
    {
        path: 'secure-messages',
        component: SecureMessagesComponent,
        data: {
            breadcrumb: 'Secure Messages'
        },
        children: [
            {
                path: '',
                component: SecureMessagesListContainerComponent,
                data: {
                    breadcrumb: null
                }
            },
            {
                path: 'create-message',
                component: SecureMessageCreateContainerComponent,
                data: {
                    breadcrumb: 'Create message'
                }
            },
            {
                path: 'message/:secure-message-id',
                component: SecureMessageViewContainerComponent,
                resolve: {
                    exported: SecureMessageViewResolver
                },
                data: {
                    breadcrumb: 'View message'
                }
            }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(SecureMessagesRoutes)
    ],
    exports: [
        RouterModule
    ],
    providers: [
        SecureMessageViewResolver
    ]
})
export class SecureMessagesRoutingModule { }
