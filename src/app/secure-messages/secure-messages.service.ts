import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';

import { SecureMessage, DraftMessage, MessageLabels } from './shared/secure-message.model';
import { environment } from '../../environments/environment';
import { AuthenticationService, CheckRequestAuthenticated } from '../authentication/authentication.service';

@Injectable()
export class SecureMessagesService {

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

        this.attachBadRequestCheck(observable, 'Error creating secure message in secure message service');

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

        this.attachBadRequestCheck(observable, 'Error getting a list of secure messages from the secure message service');

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

        this.attachBadRequestCheck(observable, 'Error getting secure message with id '
            + id + ' from secure message service');

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

        this.attachBadRequestCheck(observable, 'Error updating secure message labels');

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

        this.attachBadRequestCheck(observable, 'Error saving draft message');

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

        this.attachBadRequestCheck(observable, 'Error updating draft message');

        return observable;
    }

    private attachBadRequestCheck (observable: Observable<any>, errorHeading: string): void {

        observable.subscribe(
            () => {},
            (err: any) => {
                console.log('Bad request: ', err);

                this.router.navigate(['/server-error'], { queryParams: {
                    errorResponseCode: err.response.status,
                    errorHeading: errorHeading,
                    errorBody: 'Secure message service error: ' + err.errorMessage
                }});
            }
        );
    }
}
