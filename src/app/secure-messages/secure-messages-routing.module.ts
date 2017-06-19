import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SecureMessagesComponent } from './secure-messages.component';
import { SecureMessagesListContainerComponent } from './secure-messages-list/secure-messages-list.container';
import { SecureMessageCreateContainerComponent } from './secure-message-create/secure-message-create.container';
import { SecureMessageViewContainerComponent } from './secure-message-view/secure-message-view.container';
import { SecureMessageViewResolver } from './secure-message-view/secure-message-view.resolver.service';

import { UserResolver } from '../user/user.resolver';

export const secureMessagesRoutes: Routes = [
    {
        path: 'secure-messages',
        component: SecureMessagesComponent,
        data: {
            breadcrumb: 'Secure messages'
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
                path: 'message-sent',
                component: SecureMessagesListContainerComponent,
                data: {
                    messageSent: true
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
                    user: UserResolver,
                    exported: SecureMessageViewResolver
                },
                data: {
                    breadcrumb: 'Edit draft message'
                }
            }/*,
            {
                path: 'drafts/:draft-message-id'
            }*/
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(secureMessagesRoutes)
    ],
    exports: [
        RouterModule
    ],
    providers: [
        SecureMessageViewResolver
    ]
})
export class SecureMessagesRoutingModule { }
