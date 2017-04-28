import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SecureMessages } from './secure-messages.component';
import { SecureMessagesListContainer } from './secure-messages-list/secure-messages-list.container';
import { SecureMessageCreateContainer } from './secure-message-create/secure-message-create.container';

const SecureMessagesRoutes:Routes = [
    {
        path: 'secure-messages',
        component: SecureMessages,
        data: {
            breadcrumb: "Secure Messages"
        },
        children: [
            {
                path: '',
                component: SecureMessagesListContainer,
                data: {
                    breadcrumb: null
                }
            },
            {
                path: 'create-message',
                component: SecureMessageCreateContainer,
                data: {
                    breadcrumb: 'Create message'
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
    ]
})
export class SecureMessagesRoutingModule {}

