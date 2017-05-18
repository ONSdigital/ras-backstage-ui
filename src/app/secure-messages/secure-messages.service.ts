import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { SecureMessage } from './shared/secure-message.model';
import { environment } from '../../environments/environment';

@Injectable()
export class SecureMessagesService {

    private BASE_URL = environment.endpoints.secureMessages;

    constructor(
        private http: Http) {}

}
