import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';

import { environment } from '../../environments/environment';

@Injectable()
export class PartyService {

    static BASE_URL = environment.endpoints.party;

    constructor(
        private http: Http) {}

    public getBusiness(id: string): Observable<any> {

        return this.http.get(
                PartyService.BASE_URL + 'businesses/id/' + id
            )

            .map((res: Response) => {
                return res.json() || {};
            })

            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    public getRespondent(id: string): Observable<any> {

        return this.http.get(
            PartyService.BASE_URL + 'respondents/id/' + id
        )

        .map((res: Response) => {
            return res.json() || {};
        })

        .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }
}
