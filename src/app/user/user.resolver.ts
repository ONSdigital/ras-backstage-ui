import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

import { NgRedux } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';

import { UserActions } from './user.actions';

@Injectable()
export class UserResolver implements Resolve<Observable<any>> {

    constructor(
        private userActions: UserActions) {}

    resolve(route: ActivatedRouteSnapshot): Observable<any> {
        return this.userActions.getUser();
    }
}
