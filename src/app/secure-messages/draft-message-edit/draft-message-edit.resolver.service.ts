import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { DraftMessage } from '../shared/secure-message.model';
import { SecureMessagesActions } from '../secure-messages.actions';

@Injectable()
export class DraftMessageEditResolver implements Resolve<Observable<any>> {

    constructor(
        private router: Router,
        private secureMessagesActions: SecureMessagesActions) {}

    resolve(route: ActivatedRouteSnapshot): Observable<any> {
        const id = route.params['draft-message-id'];
        const exported: any = {};

        const resolve = this.secureMessagesActions.retrieveSecureMessage(id)
            .map((draftMessage: DraftMessage) => {
                exported.draftMessage = draftMessage;

                return exported;
            });

        resolve.subscribe(
            data => {},
            (err: any) => this.router.navigate(['/404'])
        );

        return resolve;
    }
}