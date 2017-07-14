import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';

import { SecureMessage, DraftMessage, MessageLabels } from './shared/secure-message.model';
import { environment } from '../../environments/environment';
import { AuthenticationService } from '../authentication/authentication.service';

@Injectable()
export class SecureMessagesService {

    static BASE_URL = environment.endpoints.secureMessages;

    public encryptedHeaders = new Headers({
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    });

    constructor(
        private http: Http,
        private authenticationService: AuthenticationService) {}

    public createSecureMessage(secureMessage: SecureMessage): Observable<any> {

        const request = (() => {

            return this.http.post(
                SecureMessagesService.BASE_URL + 'message/send',
                secureMessage,
                new RequestOptions({
                    method: RequestMethod.Post,
                    headers: this.encryptedHeaders
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

        return this.isAuthenticated() ? request() : this.authenticate(request);
    }

    // @AuthorisationRequired()
    public getAllMessages(): Observable<any> {

        const request = (() => {

            return this.http.get(
                SecureMessagesService.BASE_URL + 'messages',
                new RequestOptions({
                    method: RequestMethod.Get,
                    headers: this.encryptedHeaders
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

        return this.isAuthenticated() ? request() : this.authenticate(request);
    }

    public getMessage(id: string): Observable<any> {

        const request = (() => {

            return this.http.get(
                SecureMessagesService.BASE_URL + 'message/' + id,
                new RequestOptions({
                    method: RequestMethod.Get,
                    headers: this.encryptedHeaders
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

        return this.isAuthenticated() ? request() : this.authenticate(request);
    }

    public updateMessageLabels(id: string, labels: MessageLabels): Observable<any> {

        const request = (() => {

            return this.http.put(
                SecureMessagesService.BASE_URL + 'message/' + id + '/modify',
                labels,
                new RequestOptions({
                    method: RequestMethod.Put,
                    headers: this.encryptedHeaders
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

        return this.isAuthenticated() ? request() : this.authenticate(request);
    }

    public saveDraft(draftMessage: DraftMessage): Observable<any> {

        const request = (() => {
            return this.http.post(
                SecureMessagesService.BASE_URL + 'draft/save',
                draftMessage,
                new RequestOptions({
                    method: RequestMethod.Post,
                    headers: this.encryptedHeaders
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

        return this.isAuthenticated() ? request() : this.authenticate(request);
    }

    public updateDraft(id: string, draftMessage: DraftMessage): Observable<any> {

        const request = (() => {
            return this.http.put(
                SecureMessagesService.BASE_URL + 'draft/' + id + '/modify',
                draftMessage,
                new RequestOptions({
                    method: RequestMethod.Put,
                    headers: this.encryptedHeaders
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

        return this.isAuthenticated() ? request() : this.authenticate(request);
    }

    public authenticate(request: any) {

        return this.authenticationService.getToken()
            .flatMap((token: string) => {

                if (!this.isAuthenticated()) {
                    this.encryptedHeaders.append('Authorization', token);
                }

                return request();
            })
            .share();
    }

    public isAuthenticated() {
        return this.encryptedHeaders.get('Authorization');
    }
}

/*
function AuthorisationRequired() {

    console.log('service: ', servicePointer);

    return function (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<Function>) {
        console.log('decorator: ', target, propertyKey, descriptor);

        if (!servicePointer) {
            console.log('pointer not set');
            return;
        }

        /!**
         * Cache existing method
         *!/
        const method = descriptor.value;

        /!**
         * Proxy method
         *!/
        descriptor.value = function () {
            return servicePointer.isAuthenticated()
                ? method.apply(this, arguments)
                : servicePointer.authenticate(method.apply(this, arguments));
        };
    };
}
*/
