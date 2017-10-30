import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, RequestMethod } from '@angular/http';

import { AuthenticationService, CheckRequestAuthenticated } from '../authentication/authentication.service';
import { CheckBadRequest, HandleCommonRequest, handleError, printResponse } from '../shared/utils';

import { environment } from '../../environments/environment';
import { Business } from './party.model';

@Injectable()
export class PartyService {

    static label = 'Party service';

    static BASE_URL = environment.endpoints.party;

    constructor(
        private http: Http,
        private authenticationService: AuthenticationService) {}

    @CheckBadRequest({
        errorHeading: 'Error getting reporting unit from party service',
        serviceClass: PartyService
    })
    @CheckRequestAuthenticated()
    @HandleCommonRequest({
        printStatement: 'Get business'
    })
    public getBusiness(id: string): Observable<any> {

        return this.http.get(
            PartyService.BASE_URL + 'businesses/id/' + id,
            new RequestOptions({
                method: RequestMethod.Get,
                headers: this.authenticationService.encryptedHeaders
            })
        )
        .share();
    }

    /*@CheckBadRequest({
        errorHeading: 'Error getting reporting unit by reference from party service',
        serviceClass: PartyService
    })*/
    @CheckRequestAuthenticated()
    @HandleCommonRequest({
        printStatement: 'Get business by ref'
    })
    public getBusinessByRef(ref: string) {

        return this.http.get(
            PartyService.BASE_URL + 'businesses/ref/' + ref,
            new RequestOptions({
                method: RequestMethod.Get,
                headers: this.authenticationService.encryptedHeaders
            })
        )
        .share();
    }

    @CheckBadRequest({
        errorHeading: 'Error getting respondent from party service',
        serviceClass: PartyService
    })
    @CheckRequestAuthenticated()
    @HandleCommonRequest({
        printStatement: 'Get respondent'
    })
    public getRespondent(id: string): Observable<any> {

        return this.http.get(
            PartyService.BASE_URL + 'respondents/id/' + id,
            new RequestOptions({
                method: RequestMethod.Get,
                headers: this.authenticationService.encryptedHeaders
            })
        )
        .share();
    }
}
