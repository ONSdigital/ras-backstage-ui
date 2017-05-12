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
    getStatus(surveyRef: string, collectionExerciseRef: string): Observable<any> {

        return this.http.get(this.BASE_URL + 'status/' + surveyRef + '/' + collectionExerciseRef)

            .map((res: Response) => res.json() || {})

            // Handle any errors
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }
}
