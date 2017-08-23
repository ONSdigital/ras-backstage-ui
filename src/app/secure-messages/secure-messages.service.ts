import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, RequestMethod } from '@angular/http';

import { SecureMessage, DraftMessage, MessageLabels } from './shared/secure-message.model';
import { environment } from '../../environments/environment';
import { AuthenticationService, CheckRequestAuthenticated } from '../authentication/authentication.service';
import { CheckBadRequest } from '../shared/utils';

@Injectable()
export class SecureMessagesService {

    static label = 'Secure message service';

    static BASE_URL = environment.endpoints.secureMessages;

    constructor(
        private http: Http,
        private authenticationService: AuthenticationService) {}

    @CheckBadRequest({
        errorHeading: 'Error creating secure message in secure message service',
        serviceClass: SecureMessagesService
    })
    @CheckRequestAuthenticated()
    public createSecureMessage(secureMessage: SecureMessage): Observable<any> {

        return this.http.post(
            SecureMessagesService.BASE_URL + 'message/send',
            secureMessage,
            new RequestOptions({
                method: RequestMethod.Post,
                headers: this.authenticationService.encryptedHeaders
            })
        )
        .do((res: Response) => {
            console.log('Create one: ', res);
        })
        .catch((response: any) => {
            console.log('Error response: ', response);
            return Observable.throw({ errorMessage: response._body, response });
        })
        .share();
    }

    @CheckBadRequest({
        errorHeading: 'Error getting a list of secure messages from the secure message service',
        serviceClass: SecureMessagesService
    })
    @CheckRequestAuthenticated()
    public getAllMessages(): Observable<any> {

        return this.http.get(
            SecureMessagesService.BASE_URL + 'messages?limit=1000000',
            new RequestOptions({
                method: RequestMethod.Get,
                headers: this.authenticationService.encryptedHeaders
            })
        )
        .do((res: Response) => {
            console.log('Get all: ', res);
        })
        .catch((response: any) => {
            console.log('Error response: ', response);
            return Observable.throw({ errorMessage: response._body, response });
        })
        .share();
    }

    @CheckBadRequest({
        errorHeading: 'Error getting secure message from secure message service',
        serviceClass: SecureMessagesService
    })
    @CheckRequestAuthenticated()
    public getMessage(id: string): Observable<any> {

        return this.http.get(
            SecureMessagesService.BASE_URL + 'message/' + id,
            new RequestOptions({
                method: RequestMethod.Get,
                headers: this.authenticationService.encryptedHeaders
            })
        )
        .share()
        .do((res: Response) => {
            console.log('Get one: ', res);
        })
        .catch((response: any) => {
            console.log('Error response: ', response);
            return Observable.throw({ errorMessage: response._body, response });
        })
        .share();
    }

    @CheckBadRequest({
        errorHeading: 'Error updating secure message labels',
        serviceClass: SecureMessagesService
    })
    @CheckRequestAuthenticated()
    public updateMessageLabels(id: string, labels: MessageLabels): Observable<any> {

        return this.http.put(
            SecureMessagesService.BASE_URL + 'message/' + id + '/modify',
            labels,
            new RequestOptions({
                method: RequestMethod.Put,
                headers: this.authenticationService.encryptedHeaders
            })
        )
        .do((res: Response) => {
            console.log('Update message labels: ', res);
        })
        .catch((response: any) => {
            console.log('Error response: ', response);
            return Observable.throw({ errorMessage: response._body, response });
        })
        .share();
    }

    @CheckBadRequest({
        errorHeading: 'Error saving draft message',
        serviceClass: SecureMessagesService
    })
    @CheckRequestAuthenticated()
    public saveDraft(draftMessage: DraftMessage): Observable<any> {

        return this.http.post(
            SecureMessagesService.BASE_URL + 'draft/save',
            draftMessage,
            new RequestOptions({
                method: RequestMethod.Post,
                headers: this.authenticationService.encryptedHeaders
            })
        )
        .do((res: Response) => {
            console.log('Create draft: ', res);
        })
        .catch((response: any) => {
            console.log('Error response: ', response);
            return Observable.throw({ errorMessage: response._body, response });
        })
        .share();
    }

    @CheckBadRequest({
        errorHeading: 'Error updating draft message',
        serviceClass: SecureMessagesService
    })
    @CheckRequestAuthenticated()
    public updateDraft(id: string, draftMessage: DraftMessage): Observable<any> {

        return this.http.put(
            SecureMessagesService.BASE_URL + 'draft/' + id + '/modify',
            draftMessage,
            new RequestOptions({
                method: RequestMethod.Put,
                headers: this.authenticationService.encryptedHeaders
            })
        )
        .do((res: Response) => {
            console.log('Update draft: ', res);
        })
        .catch((response: any) => {
            console.log('Error response: ', response);
            return Observable.throw({ errorMessage: response._body, response });
        })
        .share();
    }
}
