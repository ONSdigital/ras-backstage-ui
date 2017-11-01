import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

import { NgRedux } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';

import { SecureMessage } from '../shared/secure-message.model';
import { SecureMessagesActions } from '../secure-messages.actions';
import { SecureMessagesService } from '../secure-messages.service';

import { CheckBadRequest, HandleCommonRequest } from '../../shared/utils';
import { CheckRequestAuthenticated } from '../../authentication/authentication.service';

import { getDataStoreSecureMessageById } from '../shared/utils';

@Injectable()
export class SecureMessageViewResolver implements Resolve<Observable<any>> {

    constructor(
        private ngRedux: NgRedux<any>,
        private secureMessagesActions: SecureMessagesActions) {}

    resolve(route: ActivatedRouteSnapshot): Observable<any> {
        const id = route.params['secure-message-id'];
        const exported: any = {};

        return getDataStoreSecureMessageById(this.ngRedux, id)

            .flatMap((existingSecureMessage: any) => {

                return existingSecureMessage
                    ? Observable.of(existingSecureMessage)
                    : this.actionGetMessage(id);
            })

            .map((secureMessage: SecureMessage) => {
                exported.secureMessage = secureMessage;

                return exported;
            });
    }

    /**
     * Decorate service call based on its calling context
     */
    @CheckBadRequest({
        errorHeading: 'Error getting secure message from secure message service',
        serviceClass: SecureMessagesService
    })
    @CheckRequestAuthenticated()
    @HandleCommonRequest({
        printStatement: 'Get one message'
    })
    private actionGetMessage (id: string) {
        return this.secureMessagesActions.retrieveSecureMessage(id).share();
    }
}
