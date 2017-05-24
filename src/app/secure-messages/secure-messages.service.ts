import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { SecureMessage } from './shared/secure-message.model';
import { environment } from '../../environments/environment';

@Injectable()
export class SecureMessagesService {

    static BASE_URL = environment.endpoints.secureMessages;

    private headers = new Headers({ 'Content-Type': 'application/json' });
    private options = new RequestOptions({ headers: this.headers });

    constructor(
        private http: Http) {}

    public createSecureMessage(secureMessage: SecureMessage): Observable<any> {

        return this.http.post(
                SecureMessagesService.BASE_URL + 'messages/send',
                secureMessage,
                this.options
            )
            .map((res: Response) => {
                console.log(res);
            })
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }
}
