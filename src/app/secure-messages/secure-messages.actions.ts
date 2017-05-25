import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { Observable } from 'rxjs';

import { SecureMessage } from './shared/secure-message.model';
import { SecureMessagesService } from './secure-messages.service';

@Injectable()
export class SecureMessagesActions {

    static CREATE_SINGLE = 'SECURE_MESSAGE_CREATE';
    static CREATED_SINGLE = 'SECURE_MESSAGE_CREATED';
    static RETRIEVE_ALL = 'SECURE_MESSAGES_ALL_RETRIEVE';
    static RECEIVED_ALL = 'SECURE_MESSAGES_ALL_RECEIVED';

    constructor(
        private ngRedux: NgRedux<any>,
        private secureMessagesService: SecureMessagesService) {}

    public createSecureMessage(secureMessage: SecureMessage): Observable<any> {

        this.ngRedux.dispatch({
            type: SecureMessagesActions.CREATE_SINGLE,
            id: secureMessage
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

    public retrieveAllSecureMessages(): Observable<any> {

        this.ngRedux.dispatch({
            type: SecureMessagesActions.RETRIEVE_ALL
        });

        const observable = this.secureMessagesService.getAllMessages();

        observable.subscribe((secureMessages: any) => {
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
