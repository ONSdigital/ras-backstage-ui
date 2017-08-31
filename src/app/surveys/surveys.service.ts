import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { AuthenticationService, CheckRequestAuthenticated } from '../authentication/authentication.service';
import { CheckBadRequest, handleError, printResponse } from '../shared/utils';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Survey } from './shared/survey.model';
import { environment } from '../../environments/environment';

@Injectable()
export class SurveysService {

    static label = 'Surveys service';

    static BASE_URL = environment.endpoints.survey;

    constructor(
        private http: Http,
        private authenticationService: AuthenticationService) {}

    // Get a single survey
    @CheckBadRequest({
        errorHeading: 'Error loading collection instrument batch in collection instrument service',
        serviceClass: SurveysService
    })
    @CheckRequestAuthenticated()
    getSurvey(id: string): Observable<Survey> {

        return this.http.get(
            SurveysService.BASE_URL + 'surveys/' + id,
            new RequestOptions({
                method: RequestMethod.Get,
                headers: this.authenticationService.encryptedHeaders
            })
        )
        .do(printResponse.bind(this, 'Get survey'))
        .catch(handleError)
        .share();
    }

    // Fetch all existing surveys
    @CheckBadRequest({
        errorHeading: 'Error loading collection instrument batch in collection instrument service',
        serviceClass: SurveysService
    })
    @CheckRequestAuthenticated()
    getSurveys(): Observable<Survey[]> {

        return this.http.get(
            SurveysService.BASE_URL + 'surveys',
            new RequestOptions({
                method: RequestMethod.Get,
                headers: this.authenticationService.encryptedHeaders
            })
        )
        .do(printResponse.bind(this, 'Get surveys'))
        .catch(handleError)
        .share();
    }
}
