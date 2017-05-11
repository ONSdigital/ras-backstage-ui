import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { CollectionInstrument } from './shared/collection-instrument.model';
import { environment } from '../../environments/environment';

@Injectable()
export class CollectionInstrumentsService {

    private BASE_URL = environment.endpoints.collectionInstrument;

    constructor(private http: Http) { }

    // Get the status of a collection instrument upload

    // TODO: CollectionInstrumentStatus instead of any?
    getStatus(surveyRef: string, collectionExerciseRef: string): Observable<any> {

        return this.http.get(this.BASE_URL + 'status/' + surveyRef + '/' + collectionExerciseRef)

            // Call .json() on the response to return data
            // .map((res: Response) => res.json().data.Survey || {})
            .map((res: Response) => console.log(res.json())
        );

            // Handle any errors
            // .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }
}
