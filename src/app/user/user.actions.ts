import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';

import { User } from './shared/user.model';
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

        observable.subscribe(
            (user: User) => {
                this.userReceived(user);
            },
            (err: any) => console.log('Could not dispatch userReceived action, service error: ', err)
        );

        return observable;
    }

    public userReceived(user: User) {

        this.ngRedux.dispatch({
            type: UserActions.RECEIVED_USER,
            user: user
        });
    }
}
