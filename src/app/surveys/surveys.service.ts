import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { CheckRequestAuthenticated } from '../authentication/authentication.service';
import { attachBadRequestCheck } from '../shared/utils';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Survey } from './shared/survey.model';
import { environment } from '../../environments/environment';

@Injectable()
export class SurveysService {

    static label = 'Surveys service';

    static BASE_URL = environment.endpoints.survey;

    constructor(private http: Http) { }

    // Get a single survey
    @CheckRequestAuthenticated()
    getSurvey(id: string): Observable<Survey> {

        const observable = this.http.get(
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

        attachBadRequestCheck({
            observable: observable,
            errorHeading: 'Error loading collection instrument batch in collection instrument service',
            serviceInstance: this,
            serviceClass: SurveysService
        });

        return observable;
    }

    // Fetch all existing surveys
    @CheckRequestAuthenticated()
    getSurveys(): Observable<Survey[]> {

        const observable = this.http.get(
            SurveysService.BASE_URL + 'surveys'
        )
        .do((res: Response) => {
            console.log('Get surveys: ', res);
        })
        .catch((response: any) => {
            console.log('Error response: ', response);
            return Observable.throw({ errorMessage: response._body, response });
        })
        .share();

        attachBadRequestCheck({
            observable: observable,
            errorHeading: 'Error loading collection instrument batch in collection instrument service',
            serviceInstance: this,
            serviceClass: SurveysService
        });

        return observable;
    }
}
