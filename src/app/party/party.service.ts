import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';

import { CheckRequestAuthenticated } from '../authentication/authentication.service';

import { environment } from '../../environments/environment';

@Injectable()
export class PartyService {

    static BASE_URL = environment.endpoints.party;

    constructor(
        private http: Http) {}

    @CheckRequestAuthenticated()
    public getBusiness(id: string): Observable<any> {

        return this.http.get(
            PartyService.BASE_URL + 'businesses/id/' + id
        )
        .share()
        .do((res: Response) => {
            console.log('Get business: ', res);
        })
        .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    @CheckRequestAuthenticated()
    public getRespondent(id: string): Observable<any> {

        return this.http.get(
            PartyService.BASE_URL + 'respondents/id/' + id
        )
        .share()
        .do((res: Response) => {
            console.log('Get respondent: ', res);
        })
        .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }
}
