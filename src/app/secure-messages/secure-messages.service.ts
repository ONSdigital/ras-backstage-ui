import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';

import { SecureMessage, DraftMessage, MessageLabels } from './shared/secure-message.model';
import { environment } from '../../environments/environment';
import { AuthenticationService, CheckRequestAuthenticated } from '../authentication/authentication.service';

@Injectable()
export class SecureMessagesService {

    static BASE_URL = environment.endpoints.secureMessages;

    constructor(
        private http: Http,
        private authenticationService: AuthenticationService) {}

    @CheckRequestAuthenticated()
    public createSecureMessage(secureMessage: SecureMessage): Observable<any> {

        return this.authenticationService.authenticate(() => {

            return this.http.post(
                SecureMessagesService.BASE_URL + 'message/send',
                secureMessage,
                new RequestOptions({
                    method: RequestMethod.Post,
                    headers: this.authenticationService.encryptedHeaders
                })
            )
            .share()
            .do((res: Response) => {
                console.log('Create one: ', res);
            })
            .catch((error: any) => {
                console.log('Error response: ', error);
                return Observable.throw(error || 'Server error');
            });
        });
    }

    @CheckRequestAuthenticated()
    public getAllMessages() {

        return this.authenticationService.authenticate(() => {

            return this.http.get(
                SecureMessagesService.BASE_URL + 'messages',
                new RequestOptions({
                    method: RequestMethod.Get,
                    headers: this.authenticationService.encryptedHeaders
                })
            )
            .share()
            .do((res: Response) => {
                console.log('Get all: ', res);
            })
            .catch((error: any) => {
                console.log('Error response: ', error);
                return Observable.throw(error || 'Server error');
            });
        });
    }

    @CheckRequestAuthenticated()
    public getMessage(id: string): Observable<any> {

        return this.authenticationService.authenticate(() => {

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
            .catch((error: any) => {
                console.log('Error response: ', error);
                return Observable.throw(error || 'Server error');
            });
        });
    }

    @CheckRequestAuthenticated()
    public updateMessageLabels(id: string, labels: MessageLabels): Observable<any> {

        return this.authenticationService.authenticate(() => {

            return this.http.put(
                SecureMessagesService.BASE_URL + 'message/' + id + '/modify',
                labels,
                new RequestOptions({
                    method: RequestMethod.Put,
                    headers: this.authenticationService.encryptedHeaders
                })
            )
            .share()
            .do((res: Response) => {
                console.log('Update message labels: ', res);
            })
            .catch((error: any) => {
                console.log('Error response: ', error);
                return Observable.throw(error || 'Server error');
            });
        });
    }

    @CheckRequestAuthenticated()
    public saveDraft(draftMessage: DraftMessage): Observable<any> {

        return this.authenticationService.authenticate(() => {

            return this.http.post(
                SecureMessagesService.BASE_URL + 'draft/save',
                draftMessage,
                new RequestOptions({
                    method: RequestMethod.Post,
                    headers: this.authenticationService.encryptedHeaders
                })
            )
            .share()
            .do((res: Response) => {
                console.log('Create draft: ', res);
            })
            .catch((error: any) => {
                console.log('Error response: ', error);
                return Observable.throw(error || 'Server error');
            });
        });
    }

    @CheckRequestAuthenticated()
    public updateDraft(id: string, draftMessage: DraftMessage): Observable<any> {

        return this.authenticationService.authenticate(() => {

            return this.http.put(
                SecureMessagesService.BASE_URL + 'draft/' + id + '/modify',
                draftMessage,
                new RequestOptions({
                    method: RequestMethod.Put,
                    headers: this.authenticationService.encryptedHeaders
                })
            )
            .share()
            .do((res: Response) => {
                console.log('Update draft: ', res);
            })
            .catch((error: any) => {
                console.log('Error response: ', error);
                return Observable.throw(error || 'Server error');
            });
        });
    }
}
