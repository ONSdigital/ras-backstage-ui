import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { Http, RequestOptions, RequestMethod } from '@angular/http';

import { SecureMessage, DraftMessage, MessageLabels } from './shared/secure-message.model';
import { environment } from '../../environments/environment';
import { AuthenticationService, CheckRequestAuthenticated } from '../authentication/authentication.service';
import { CheckBadRequest, HandleCommonRequest } from '../shared/utils';

@Injectable()
export class SecureMessagesService {

    static label = 'Secure message service';

    static BASE_URL = environment.endpoints.secureMessages;

    constructor(
        private http: Http,
        private authenticationService: AuthenticationService) {}

    public createSecureMessage(secureMessage: SecureMessage): Observable<any> {

        return this.http.post(
            SecureMessagesService.BASE_URL + 'message/send',
            secureMessage,
            new RequestOptions({
                method: RequestMethod.Post,
                headers: this.authenticationService.encryptedHeaders
            })
        )
        .share();
    }

    /*@HandleCommonRequest({
        printStatement: 'Get all messages'
    })*/
    @CheckBadRequest({
        errorHeading: 'Error getting a list of secure messages from the secure message service',
        serviceClass: SecureMessagesService
    })
    @CheckRequestAuthenticated()
    public getAllMessages(label?: string, page?: string): Observable<any> {

        let url = SecureMessagesService.BASE_URL + 'messages?limit=10000';

        if (label) {
            url = url + '&label=' + label;
        }

        if (page) {
            url = url + '&page=' + page;
        }

        return this.http.get(
            url,
            new RequestOptions({
                method: RequestMethod.Get,
                headers: this.authenticationService.encryptedHeaders
            })
        )
        .share();
    }

    public getMessage(id: string): Observable<any> {

        return this.http.get(
            SecureMessagesService.BASE_URL + 'message?message_id=' + id + '&label=INBOX',
            new RequestOptions({
                method: RequestMethod.Get,
                headers: this.authenticationService.encryptedHeaders
            })
        )
        .share();
    }

    @CheckBadRequest({
        errorHeading: 'Error updating secure message labels',
        serviceClass: SecureMessagesService
    })
    @CheckRequestAuthenticated()
    @HandleCommonRequest({
        printStatement: 'Update message labels'
    })
    public updateMessageLabels(id: string, labels: MessageLabels): Observable<any> {

        return this.http.put(
            SecureMessagesService.BASE_URL + 'remove-unread?message_id=' + id,
            labels,
            new RequestOptions({
                method: RequestMethod.Put,
                headers: this.authenticationService.encryptedHeaders
            })
        )
        .share();
    }

    @CheckBadRequest({
        errorHeading: 'Error saving draft message',
        serviceClass: SecureMessagesService
    })
    @CheckRequestAuthenticated()
    @HandleCommonRequest({
        printStatement: 'Create draft'
    })
    public saveDraft(draftMessage: DraftMessage): Observable<any> {

        return this.http.post(
            SecureMessagesService.BASE_URL + 'draft/save',
            draftMessage,
            new RequestOptions({
                method: RequestMethod.Post,
                headers: this.authenticationService.encryptedHeaders
            })
        )
        .share();
    }

    @CheckBadRequest({
        errorHeading: 'Error updating draft message',
        serviceClass: SecureMessagesService
    })
    @CheckRequestAuthenticated()
    @HandleCommonRequest({
        printStatement: 'Update draft'
    })
    public updateDraft(id: string, draftMessage: DraftMessage): Observable<any> {

        return this.http.put(
            SecureMessagesService.BASE_URL + 'draft/' + id + '/modify',
            draftMessage,
            new RequestOptions({
                method: RequestMethod.Put,
                headers: this.authenticationService.encryptedHeaders
            })
        )
        .share();
    }
}
