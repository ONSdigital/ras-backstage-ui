import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';

import { CheckRequestAuthenticated } from '../authentication/authentication.service';
import { attachBadRequestCheck } from '../shared/utils';

import { environment } from '../../environments/environment';

@Injectable()
export class PartyService {

    static label = 'Party service';

    static BASE_URL = environment.endpoints.party;

    constructor(
        private http: Http,
        private router: Router) {}

    @CheckRequestAuthenticated()
    public getBusiness(id: string): Observable<any> {

        const observable = this.http.get(
            PartyService.BASE_URL + 'businesses/id/' + id
        )
        .do((res: Response) => {
            console.log('Get business: ', res);
        })
        .catch((response: any) => {
            console.log('Error response: ', response);
            return Observable.throw({ errorMessage: response._body, response });
        })
        .share();

        attachBadRequestCheck({
            observable: observable,
            errorHeading: 'Error fetching reporting unit',
            serviceInstance: this,
            serviceClass: PartyService
        });

        return observable;
    }

    @CheckRequestAuthenticated()
    public getRespondent(id: string): Observable<any> {

        const observable = this.http.get(
            PartyService.BASE_URL + 'respondents/id/' + id
        )
        .do((res: Response) => {
            console.log('Get respondent: ', res);
        })
        .catch((response: any) => {
            console.log('Error response: ', response);
            return Observable.throw({ errorMessage: response._body, response });
        })
        .share();

        attachBadRequestCheck({
            observable: observable,
            errorHeading: 'Error fetching respondent',
            serviceInstance: this,
            serviceClass: PartyService
        });

        return observable;
    }
}
