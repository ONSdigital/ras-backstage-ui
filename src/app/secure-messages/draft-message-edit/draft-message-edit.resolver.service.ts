import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { DraftMessage } from '../shared/secure-message.model';
import { SecureMessagesService } from '../secure-messages.service';
import { CheckBadRequest, HandleCommonRequest } from '../../shared/utils';
import { CheckRequestAuthenticated } from '../../authentication/authentication.service';

@Injectable()
export class DraftMessageEditResolver implements Resolve<Observable<any>> {

    constructor(
        public router: Router,
        private secureMessagesService: SecureMessagesService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<any> {
        const id = route.params['draft-message-id'];
        const exported: any = {};

        const resolve = this.serviceGetMessage(id)
            .map(res => res.json())
            .share()
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

    @CheckBadRequest({
        errorHeading: 'Error getting secure message from secure message service',
        serviceClass: SecureMessagesService
    })
    @CheckRequestAuthenticated()
    @HandleCommonRequest({
        printStatement: 'Get one message'
    })
    private serviceGetMessage (id: string) {
        return this.secureMessagesService.getMessage(id).share();
    }
}
