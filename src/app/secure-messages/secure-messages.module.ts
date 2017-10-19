import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { UserModule } from '../user/user.module';
import { BreadcrumbModule } from '../shared/breadcrumb/breadcrumb.module';
import { SecureMessagesRoutingModule } from './secure-messages-routing.module';

import { PartyService } from '../party/party.service';

import { SecureMessagesService } from './secure-messages.service';
import { SecureMessagesActions } from './secure-messages.actions';

import { SecureMessagesComponent } from './secure-messages.component';
import { SecureMessagesListComponent } from './secure-messages-list/secure-messages-list.component';
import { SecureMessagesListContainerComponent } from './secure-messages-list/secure-messages-list.container';
import { SecureMessageCreateComponent } from './secure-message-create/secure-message-create.component';
import { SecureMessageViewComponent } from './secure-message-view/secure-message-view.component';
import { SecureMessageViewContainerComponent } from './secure-message-view/secure-message-view.container';
import { SecureMessageCreateContainerComponent } from './secure-message-create/secure-message-create.container';
import { SecureMessageFormComponent } from './shared/secure-message-form/secure-message-form.component';
import {
    SecureMessageFormBodyComponent
} from './shared/secure-message-form/secure-message-form-body/secure-message-form-body.component';
import {
    SecureMessageFormSubjectComponent
} from './shared/secure-message-form/secure-message-form-subject/secure-message-form-subject.component';
import {
    SecureMessageConversationComponent
} from './shared/secure-message-conversation/secure-message-conversation.component';
import {
    SecureMessageConversationMessageComponent
} from './shared/secure-message-conversation/secure-message-conversation-message/secure-message-conversation-message.component';
import { DraftMessageEditComponent } from './draft-message-edit/draft-message-edit.component';
import { DraftMessageEditContainerComponent } from './draft-message-edit/draft-message-edit.container';

import { NavigationTabsComponent } from '../shared/navigation-tabs/navigation-tabs.component';
import { SystemFeedbackComponent } from '../shared/system-feedback/system-feedback.component';
import { ButtonPrimaryComponent } from '../shared/buttons/button-primary/button-primary.component';
import { ButtonSecondaryComponent } from '../shared/buttons/button-secondary/button-secondary.component';
import {
    RemainingCharacterCountComponent
} from '../shared/remaining-character-count/remaining-character-count.component';

@NgModule({
    imports: [
        HttpModule,
        CommonModule,
        RouterModule,
        FormsModule,
        BreadcrumbModule,
        UserModule,

        SecureMessagesRoutingModule,
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
        SecureMessageFormBodyComponent,
        SecureMessageFormSubjectComponent,
        SecureMessageConversationComponent,
        SecureMessageConversationMessageComponent,
        DraftMessageEditComponent,
        DraftMessageEditContainerComponent,
        NavigationTabsComponent,
        SystemFeedbackComponent,
        ButtonPrimaryComponent,
        ButtonSecondaryComponent,
        RemainingCharacterCountComponent
    ],
    providers: [
        PartyService,
        SecureMessagesService,
        SecureMessagesActions,
    ]
})
export class SecureMessagesModule {}
