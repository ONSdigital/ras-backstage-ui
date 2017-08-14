import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { CheckRequestAuthenticated } from '../authentication/authentication.service';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Survey } from './shared/survey.model';
import { environment } from '../../environments/environment';

@Injectable()
export class SurveysService {

    static BASE_URL = environment.endpoints.survey;

    constructor(private http: Http) { }

    // Get a single survey
    @CheckRequestAuthenticated()
    getSurvey(id: string): Observable<Survey> {

        return this.http.get(
            SurveysService.BASE_URL + 'surveys/' + id
        )
        .do((res: Response) => {
            console.log('Get survey: ', res);
        })
        .catch((response: any) => {
            console.log('Error response: ', response);
            return Observable.throw({ errorMessage: response._body, response });
        })
        .share();
    }

    // Fetch all existing surveys
    @CheckRequestAuthenticated()
    getSurveys(): Observable<Survey[]> {

        return this.http.get(
            SurveysService.BASE_URL + 'surveys'
        )
        .do((res: Response) => {
            console.log('Get surveys: ', res);
        })
        .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }
}
