import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';

import { SecureMessage, DraftMessage, MessageLabels } from './shared/secure-message.model';
import { environment } from '../../environments/environment';
import { AuthenticationService, CheckRequestAuthenticated } from '../authentication/authentication.service';
import { attachBadRequestCheck } from '../shared/utils';

@Injectable()
export class SecureMessagesService {

    static label = 'Secure message service';

    static BASE_URL = environment.endpoints.secureMessages;

    constructor(
        private http: Http,
        private router: Router,
        private authenticationService: AuthenticationService) {}

    @CheckRequestAuthenticated()
    public createSecureMessage(secureMessage: SecureMessage): Observable<any> {

        const observable = this.http.post(
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

        attachBadRequestCheck({
            observable: observable,
            errorHeading: 'Error creating secure message in secure message service',
            serviceInstance: this,
            serviceClass: SecureMessagesService
        });

        return observable;
    }

    @CheckRequestAuthenticated()
    public getAllMessages() {

        const observable = this.http.get(
            SecureMessagesService.BASE_URL + 'messages',
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

        attachBadRequestCheck({
            observable: observable,
            errorHeading: 'Error getting a list of secure messages from the secure message service',
            serviceInstance: this,
            serviceClass: SecureMessagesService
        });

        return observable;
    }

    @CheckRequestAuthenticated()
    public getMessage(id: string): Observable<any> {

        const observable = this.http.get(
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

        attachBadRequestCheck({
            observable: observable,
            errorHeading: 'Error getting secure message with id ' + id + ' from secure message service',
            serviceInstance: this,
            serviceClass: SecureMessagesService
        });

        return observable;
    }

    @CheckRequestAuthenticated()
    public updateMessageLabels(id: string, labels: MessageLabels): Observable<any> {

        const observable = this.http.put(
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

        attachBadRequestCheck({
            observable: observable,
            errorHeading: 'Error updating secure message labels',
            serviceInstance: this,
            serviceClass: SecureMessagesService
        });

        return observable;
    }

    @CheckRequestAuthenticated()
    public saveDraft(draftMessage: DraftMessage): Observable<any> {

        const observable = this.http.post(
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

        attachBadRequestCheck({
            observable: observable,
            errorHeading: 'Error saving draft message',
            serviceInstance: this,
            serviceClass: SecureMessagesService
        });

        return observable;
    }

    @CheckRequestAuthenticated()
    public updateDraft(id: string, draftMessage: DraftMessage): Observable<any> {

        const observable = this.http.put(
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

        attachBadRequestCheck({
            observable: observable,
            errorHeading: 'Error updating draft message',
            serviceInstance: this,
            serviceClass: SecureMessagesService
        });

        return observable;
    }
}
