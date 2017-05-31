import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { SecureMessage } from './shared/secure-message.model';
import { environment } from '../../environments/environment';
import { AuthenticationService } from '../authentication/authentication.service';

@Injectable()
export class SecureMessagesService {

    static BASE_URL = environment.endpoints.secureMessages;

    private encryptedHeaders = new Headers({
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
                return Observable.throw(error.json().error || 'Server error');
            });
        });

        return this.isAuthenticated() ? request() : this.authenticate(request);
    }

    public getAllMessages(): Observable<any> {

        const request = (() => {

            return this.http.get(
                SecureMessagesService.BASE_URL + 'messages',
                new RequestOptions({
                    method: RequestMethod.Get,
                    headers: this.encryptedHeaders
                })
            )
            .do((res: Response) => {
                console.log('Get all: ', res);
            })
            .catch((error: any) => {
                console.log('Error response: ', error);
                return Observable.throw(error.json().error || 'Server error');
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
            .do((res: Response) => {
                console.log('Get one: ', res);
            })
            .catch((error: any) => {
                console.log('Error response: ', error);
                return Observable.throw(error.json().error || 'Server error');
            });
        });

        return this.isAuthenticated() ? request() : this.authenticate(request);
    }

    public authenticate (request: any) {

        return this.authenticationService.getToken()
            .concatMap((token: string) => {

                if (!this.isAuthenticated()) {
                    this.encryptedHeaders.append('Authorization', token);
                }

                return request();
            });
    }

    public isAuthenticated () {
        return this.encryptedHeaders.get('Authorization');
    }
}
