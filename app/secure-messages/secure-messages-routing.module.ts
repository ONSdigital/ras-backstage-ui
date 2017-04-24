import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SecureMessages } from './secure-messages.component';

const SecureMessagesRoutes:Routes = [
    {
        path: 'secure-messages',
        component: SecureMessages,
        data: {
            breadcrumb: "Secure Messages"
        }
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

