import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

import { NgRedux } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';

import { SecureMessage } from '../shared/secure-message.model';
import { SecureMessagesActions } from '../secure-messages.actions';

import { getDataStoreSecureMessageById } from '../shared/utils';

@Injectable()
export class SecureMessageViewResolver implements Resolve<Observable<any>> {

    constructor(
        private ngRedux: NgRedux<any>,
        private secureMessagesActions: SecureMessagesActions) {}

    resolve(route: ActivatedRouteSnapshot): Observable<any> {

        const id = route.params['secure-message-id'];
        const exported: any = {};

        const resolve = getDataStoreSecureMessageById(this.ngRedux, id)

            .flatMap((existingSecureMessage: any) => {

                return existingSecureMessage
                    ? Observable.of(existingSecureMessage)
                    : this.secureMessagesActions.retrieveSecureMessage(id);
            })

            .map((secureMessage: SecureMessage) => {
                exported.secureMessage = secureMessage;

                return exported;
            });

        /*resolve.subscribe((secureMessage: SecureMessage) => {

            if (!secureMessage) {
                /!**
                 * TODO
                 * Navigate to 404
                 *!/
            }
        });*/

        return resolve;
    }
}
