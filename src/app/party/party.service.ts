import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';

import { CheckRequestAuthenticated } from '../authentication/authentication.service';

import { environment } from '../../environments/environment';

@Injectable()
export class PartyService {

    static BASE_URL = environment.endpoints.party;

    constructor(
        private http: Http,
        private router: Router) {}

    @CheckRequestAuthenticated()
    public getBusiness(id: string): Observable<any> {

        const observable = this.http.get(
            PartyService.BASE_URL + 'businesses/id/' + id
        )
        .share()
        .do((res: Response) => {
            console.log('Get business: ', res);
        })
        .catch((response: any) => {
            console.log('Error response: ', response);
            return Observable.throw({ errorMessage: response.json(), response });
        });

        observable.subscribe(
            data => {},
            (err: any) => {
                console.log('Bad request: ', err);
                this.router.navigate(['/server-error'], {
                    queryParams: {
                        errorResponseCode: err.status,
                        errorHeading: 'Error fetching reporting unit from party service',
                        errorBody: 'Party service error: ' + err.response.json()
                    }
                });
            }
        );

        return observable;
    }

    @CheckRequestAuthenticated()
    public getRespondent(id: string): Observable<any> {

        const observable = this.http.get(
            PartyService.BASE_URL + 'respondents/id/' + id
        )
        .share()
        .do((res: Response) => {
            console.log('Get respondent: ', res);
        })
        .catch((response: any) => {
            console.log('Error response: ', response);
            return Observable.throw({ errorMessage: response.json(), response });
        });

        observable.subscribe(
            data => {},
            (err: any) => {
                console.log('Bad request: ', err);
                this.router.navigate(['/server-error'], {
                    queryParams: {
                        errorResponseCode: err.status,
                        errorHeading: 'Error fetching respondent from party service',
                        errorBody: 'Party service error: ' + err.response.json()
                    }
                });
            }
        );

        return observable;
    }
}
