import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
// import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { User } from './shared/user.model';

@Injectable()
export class UserService {

    /**
     * TODO - fetch user from service after log in
     */
    public user: Observable<User>;

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
    }
}
