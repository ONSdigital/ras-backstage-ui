import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Survey } from './shared/survey.model';
import { environment } from '../../environments/environment';

@Injectable()
export class SurveysService {

    private BASE_URL = environment.endpoints.survey;

    constructor(private http: Http) { }

    // Get a single survey
    getSurvey(urn: string): Observable<Survey> {

        return this.http.get(this.BASE_URL + 'surveys/' + urn)

            // Call .json() on the response to return data
            .map((res: Response) => res.json().data.Survey || {})

            // Handle any errors
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    // Fetch all existing surveys
    getSurveys(): Observable<Survey[]> {

        return this.http.get(this.BASE_URL + 'surveys')

            // Call .json() on the response to return data
            .map((res: Response) => res.json().data || {})

            // Handle any errors
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }
}
