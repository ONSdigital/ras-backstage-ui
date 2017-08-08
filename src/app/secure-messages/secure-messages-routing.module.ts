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
                path: 'create-message',
                component: SecureMessageCreateContainerComponent,
                resolve: {
                    exported: SecureMessageCreateResolver
                },
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
export class SecureMessagesRoutingModule { }
