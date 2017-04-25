import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SecureMessages } from './secure-messages.component';
import { SecureMessagesListContainer } from './shared/secure-messages-list/secure-messages-list.container';

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

