import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';

import { SecureMessage, DraftMessage } from './shared/secure-message.model';
import { SecureMessagesService } from './secure-messages.service';

@Injectable()
export class SecureMessagesActions {

    static CREATE_SINGLE =          'SECURE_MESSAGE_CREATE';
    static CREATED_SINGLE =         'SECURE_MESSAGE_CREATED';
    static RETRIEVE_SINGLE =        'SECURE_MESSAGES_SINGLE_RETRIEVE';
    static RECEIVED_SINGLE =        'SECURE_MESSAGES_SINGLE_RECEIVED';
    static UPDATE_SINGLE_LABELS =   'SECURE_MESSAGES_SINGLE_UPDATE';
    static UPDATED_SINGLE_LABELS =  'SECURE_MESSAGES_SINGLE_UPDATED';
    static RETRIEVE_ALL =           'SECURE_MESSAGES_ALL_RETRIEVE';
    static RECEIVED_ALL =           'SECURE_MESSAGES_ALL_RECEIVED';
    static VIEW_ALL =               'SECURE_MESSAGES_ALL_VIEW';
    static REPLY_SINGLE =           'SECURE_MESSAGE_REPLY_CREATE';
    static REPLIED_SINGLE =         'SECURE_MESSAGE_REPLY_CREATED';
    static DRAFT_SAVE =             'DRAFT_SAVE';
    static DRAFT_SAVED =            'DRAFT_SAVED';
    static DRAFT_UPDATE =           'DRAFT_UPDATE';
    static DRAFT_UPDATED =          'DRAFT_UPDATED';

    constructor(
        private ngRedux: NgRedux<any>,
        private secureMessagesService: SecureMessagesService) {}

    public createSecureMessage(secureMessage: SecureMessage): Observable<any> {

        this.ngRedux.dispatch({
            type: SecureMessagesActions.CREATE_SINGLE,
            secureMessage: secureMessage
        });

        const observable = this.secureMessagesService.createSecureMessage(secureMessage)
            .share();

        observable.subscribe(
            (status: any) => {
                this.createdSecureMessage(status);
            },
            (err: any) => console.log('Could not dispatch createdSecureMessage action, service error: ', err)
        );

        return observable;
    }

    public createdSecureMessage(status: any) {

        this.ngRedux.dispatch({
            type: SecureMessagesActions.CREATED_SINGLE,
            payload: status
        });
    }

    public replyToSecureMessage(secureMessage: SecureMessage) {

        this.ngRedux.dispatch({
            type: SecureMessagesActions.REPLY_SINGLE,
            payload: secureMessage
        });

        const observable = this.secureMessagesService.createSecureMessage(secureMessage)
            .share();

        observable.subscribe(
            (statusMessage: any) => {
                this.repliedToSecureMessage(statusMessage);
            },
            (err: any) => console.log('Could not dispatch repliedToSecureMessage action, service error: ', err)
        );

        return observable;
    }

    public repliedToSecureMessage(statusMessage: any) {

        this.ngRedux.dispatch({
            type: SecureMessagesActions.REPLIED_SINGLE,
            payload: statusMessage
        });
    }

    public retrieveSecureMessage(id: string): Observable<any> {

        this.ngRedux.dispatch({
            type: SecureMessagesActions.RETRIEVE_SINGLE,
            id: id
        });

        const observable = this.secureMessagesService.getMessage(id)
            .map(res => res.json())
            .share();

        observable.subscribe(
            (secureMessage: SecureMessage) => {
                this.receivedSecureMessage(secureMessage);
            },
            (err: any) => console.log('Could not dispatch receivedSecureMessage action, service error: ', err)
        );

        return observable;
    }

    public receivedSecureMessage(secureMessage: SecureMessage) {

        this.ngRedux.dispatch({
            type: SecureMessagesActions.RECEIVED_SINGLE,
            secureMessage: secureMessage
        });
    }

    public retrieveAllSecureMessages(): Observable<any> {

        this.ngRedux.dispatch({
            type: SecureMessagesActions.RETRIEVE_ALL
        });

        const observable = this.secureMessagesService.getAllMessages()
            .map(res => res.json().messages)
            .share();

        observable.subscribe(
            (secureMessages: Array<SecureMessage>) => {
                this.receivedAllSecureMessages(secureMessages);
            },
            (err: any) => console.log('Could not dispatch receivedAllSecureMessages action, service error: ', err)
        );

        return observable;
    }

    public receivedAllSecureMessages(secureMessages: Array<SecureMessage>) {

        this.ngRedux.dispatch({
            type: SecureMessagesActions.RECEIVED_ALL,
            payload: secureMessages
        });
    }

    public saveDraft(draftMessage: DraftMessage): Observable<any> {

        this.ngRedux.dispatch({
            type: SecureMessagesActions.DRAFT_SAVE,
            draftMessage: draftMessage
        });

        const observable = this.secureMessagesService.saveDraft(draftMessage)
            .share();

        observable.subscribe(
            (status: Array<SecureMessage>) => {
                this.savedDraft(status);
            },
            (err: any) => console.log('Could not dispatch savedDraft action, service error: ', err)
        );

        return observable;
    }

    public savedDraft(status: any) {

        this.ngRedux.dispatch({
            type: SecureMessagesActions.DRAFT_SAVED,
            payload: status
        });
    }

    public updateDraft(draftMessage: DraftMessage): Observable<any> {

        this.ngRedux.dispatch({
            type: SecureMessagesActions.DRAFT_UPDATE,
            draftMessage: draftMessage
        });

        const observable = this.secureMessagesService.updateDraft(draftMessage.msg_id, draftMessage)
            .share();

        observable.subscribe(
            (status: Array<SecureMessage>) => {
                this.updatedDraft(status);
            },
            (err: any) => console.log('Could not dispatch updatedDraft action, service error: ', err)
        );

        return observable;
    }

    public updatedDraft(status: any) {

        this.ngRedux.dispatch({
            type: SecureMessagesActions.DRAFT_UPDATED,
            payload: status
        });
    }

    public viewAllMessages() {

        this.ngRedux.dispatch({
            type: SecureMessagesActions.VIEW_ALL
        });
    }

    public updateSingleMessageLabels(id: string): Observable<any> {

        this.ngRedux.dispatch({
            type: SecureMessagesActions.UPDATE_SINGLE_LABELS,
            secureMessageId: id
        });

        const observable = this.secureMessagesService.updateMessageLabels(id, {
                label: 'UNREAD',
                action: 'remove'
            })
            .share();

        observable.subscribe(
            () => {
                this.updatedSingleMessageLabels(id);
            },
            (err: any) => console.log('Could not dispatch updatedSingleMessageLabels action, service error: ', err)
        );

        return observable;
    }

    public updatedSingleMessageLabels(id: string) {

        this.ngRedux.dispatch({
            type: SecureMessagesActions.UPDATED_SINGLE_LABELS,
            secureMessageId: id
        });
    }
}
