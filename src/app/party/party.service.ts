import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, RequestMethod } from '@angular/http';

import { AuthenticationService, CheckRequestAuthenticated } from '../authentication/authentication.service';
import { CheckBadRequest, handleError, printResponse } from '../shared/utils';

import { environment } from '../../environments/environment';

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
    public getBusiness(id: string): Observable<any> {

        return this.http.get(
            PartyService.BASE_URL + 'businesses/id/' + id,
            new RequestOptions({
                method: RequestMethod.Get,
                headers: this.authenticationService.encryptedHeaders
            })
        )
        .do(printResponse.bind(this, 'Get business: '))
        .catch(handleError)
        .share();
    }

    /*@CheckBadRequest({
        errorHeading: 'Error getting reporting unit by reference from party service',
        serviceClass: PartyService
    })*/
    @CheckRequestAuthenticated()
    public getBusinessByRef(ref: string): Observable<any> {

        return this.http.get(
            PartyService.BASE_URL + 'businesses/ref/' + ref,
            new RequestOptions({
                method: RequestMethod.Get,
                headers: this.authenticationService.encryptedHeaders
            })
        )
        .do(printResponse.bind(this, 'Get business: '))
        .catch(handleError)
        .share();
    }

    @CheckBadRequest({
        errorHeading: 'Error getting respondent from party service',
        serviceClass: PartyService
    })
    @CheckRequestAuthenticated()
    public getRespondent(id: string): Observable<any> {

        return this.http.get(
            PartyService.BASE_URL + 'respondents/id/' + id,
            new RequestOptions({
                method: RequestMethod.Get,
                headers: this.authenticationService.encryptedHeaders
            })
        )
        .do(printResponse.bind(this, 'Get respondent: '))
        .catch(handleError)
        .share();
    }
}
