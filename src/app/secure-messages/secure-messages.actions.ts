import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { Observable } from 'rxjs';

import { SecureMessage } from './shared/secure-message.model';
import { SecureMessagesService } from './secure-messages.service';

@Injectable()
export class SecureMessagesActions {

    static CREATE_SINGLE = 'SECURE_MESSAGE_CREATE';
    static CREATED_SINGLE = 'SECURE_MESSAGE_CREATED';
    static RETRIEVE_SINGLE = 'SECURE_MESSAGES_SINGLE_RETRIEVE';
    static RECEIVED_SINGLE = 'SECURE_MESSAGES_SINGLE_RECEIVED';
    static RETRIEVE_ALL = 'SECURE_MESSAGES_ALL_RETRIEVE';
    static RECEIVED_ALL = 'SECURE_MESSAGES_ALL_RECEIVED';

    constructor(
        private ngRedux: NgRedux<any>,
        private secureMessagesService: SecureMessagesService) {}

    public createSecureMessage(secureMessage: SecureMessage): Observable<any> {

        this.ngRedux.dispatch({
            type: SecureMessagesActions.CREATE_SINGLE,
            secureMessage: secureMessage
        });

        const observable = this.secureMessagesService.createSecureMessage(secureMessage);

        observable.subscribe((statusMessage: any) => {
            this.createdSecureMessage(statusMessage);
        });

        return observable;
    }

    public createdSecureMessage(statusMessage: any) {

        this.ngRedux.dispatch({
            type: SecureMessagesActions.CREATED_SINGLE,
            payload: statusMessage
        });
    }

    public retrieveSecureMessage(id: string): Observable<any> {

        this.ngRedux.dispatch({
            type: SecureMessagesActions.RETRIEVE_SINGLE,
            id: id
        });

        const observable = this.secureMessagesService.getMessage(id)
            .map(res => res.json());

        observable.subscribe((secureMessage: SecureMessage) => {
            this.receivedSecureMessage(secureMessage);
        });

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
            .map(res => res.json().messages);

        observable.subscribe((secureMessages: Array<SecureMessage>) => {
            this.receivedAllSecureMessages(secureMessages);
        });

        return observable;
    }

    public receivedAllSecureMessages(secureMessages: Array<SecureMessage>) {

        this.ngRedux.dispatch({
            type: SecureMessagesActions.RECEIVED_ALL,
            payload: secureMessages
        });
    }

}
