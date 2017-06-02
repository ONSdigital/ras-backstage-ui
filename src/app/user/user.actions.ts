import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';

import { UserService } from './user.service';

@Injectable()
export class UserActions {

    static GET_USER = 'USER_GET';
    static RECEIVED_USER = 'USER_RECEIVED';

    constructor(
        private ngRedux: NgRedux<any>,
        private userService: UserService) {}

    public getUser(): Observable<any> {

        this.ngRedux.dispatch({
            type: UserActions.GET_USER
        });

        const observable = this.userService.getUser();

        observable.subscribe(() => {
            this.userReceived();
        });

        return observable;
    }

    public userReceived() {

        this.ngRedux.dispatch({
            type: UserActions.RECEIVED_USER
        });
    }
}
