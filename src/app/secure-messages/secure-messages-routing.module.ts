import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SecureMessagesComponent } from './secure-messages.component';
import { SecureMessagesListContainerComponent } from './secure-messages-list/secure-messages-list.container';
import { SecureMessageCreateContainerComponent } from './secure-message-create/secure-message-create.container';
import { SecureMessageViewContainerComponent } from './secure-message-view/secure-message-view.container';
import { SecureMessageViewResolver } from './secure-message-view/secure-message-view.resolver.service';
import { DraftMessageEditContainerComponent } from './draft-message-edit/draft-message-edit.container';

import { UserResolver } from '../user/user.resolver';
import { DraftMessageEditResolver } from './draft-message-edit/draft-message-edit.resolver.service';

import { SecureMessageCreateResolver } from './secure-message-create/secure-message-create.resolver';

import { CanActivateAuthentication } from '../authentication/shared/authentication-route-guard.resolver';

export const secureMessagesRoutes: Routes = [
    {
        path: 'secure-messages',
        component: SecureMessagesComponent,
        canActivate: [CanActivateAuthentication],
        data: {
            breadcrumb: 'Secure messages'
        },
        children: [
            {
                path: '',
                component: SecureMessagesListContainerComponent,
                data: {
                    title: 'Secure messages - ONS Data Collection',
                    breadcrumb: null
                }
            },
            {
                path: 'create-message',
                component: SecureMessageCreateContainerComponent,
                resolve: {
                    exported: SecureMessageCreateResolver
                },
                data: {
                    title: 'Create message - ONS Data Collection',
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
                    title: 'View message - ONS Data Collection',
                    breadcrumb: resolveSecureMessagesViewBreadcrumb
                }
            },
            {
                path: 'drafts/:draft-message-id',
                component: DraftMessageEditContainerComponent,
                resolve: {
                    exported: DraftMessageEditResolver
                },
                data: {
                    title: 'Edit draft - ONS Data Collection',
                    breadcrumb: 'Edit draft message'
                }
            }
        ]
    }
];

export function resolveSecureMessagesViewBreadcrumb(dataResolved: {exported: any}): string {
    return dataResolved.exported.secureMessage.subject;
}

@NgModule({
    imports: [
        RouterModule.forChild(secureMessagesRoutes)
    ],
    exports: [
        RouterModule
    ],
    providers: [
        SecureMessageCreateResolver,
        SecureMessageViewResolver,
        DraftMessageEditResolver
    ]
})
export class SecureMessagesRoutingModule {}
