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
    private token: string;

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
                .map((res: Response) => {
                    console.log(res);
                })
                .catch((error: any) => {
                    console.log('Error response: ', error);
                    return Observable.throw(error.json().error || 'Server error');
                });
            });

        return this.encryptedHeaders.get('Authorization') ? request() : this.authenticate(request);
    }

    public authenticate (request: any) {
        return this.authenticationService.getToken()
            .flatMap((token: string) => {
                this.encryptedHeaders.append('Authorization', token);

                return request();
            });
    }
}
