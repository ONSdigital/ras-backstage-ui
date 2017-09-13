import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { User } from './shared/user.model';

@Injectable()
export class UserService {

    // private headers = new Headers({ 'Content-Type': 'application/json' });
    // private options = new RequestOptions({ headers: this.headers });

    /**
     * TODO - fetch user from service after log in
     */
    public user: Observable<User>;

    constructor(
        private http: Http) {}

    public getUser(): Observable<any> {
        /**
         * Internal user
         */
        return this.user = Observable.of({
            id: 'BRES',
            emailAddress: 'backstage@ons.gov.uk',
            firstName: 'BRES',
            lastName: '',
            telephone: '+44 1234 567890',
            status: 'ACTIVE'
        });

        /**
         * Respondent
         */
        /*return this.user = Observable.of({
            id: '0a7ad740-10d5-4ecb-b7ca-3c0384afb882',
            emailAddress: 'onsuser@ons.com',
            firstName: 'John',
            lastName: 'Doe',
            telephone: '+44 1234 567890',
            status: 'ACTIVE'
        });*/
    }
}
