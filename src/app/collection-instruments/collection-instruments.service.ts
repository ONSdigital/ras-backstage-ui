import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { CheckRequestAuthenticated } from '../authentication/authentication.service';

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
    @CheckRequestAuthenticated()
    getStatus(collectionExerciseId: string): Observable<any> {

        return this.http.get(this.BASE_URL + 'status/' + collectionExerciseId)

            // Handle the response
            .map((res: Response) => {
                return res.json() || {};
            })

            // Handle any errors
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    @CheckRequestAuthenticated()
    loadCollectionInstrumentBatch(collectionExerciseId: string): Observable<any> {

        // Set content type to JSON
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const options = new RequestOptions({ headers: headers });

        return this.http.put(this.BASE_URL + 'activate/' + collectionExerciseId, {}, options)

            // Handle the response
            .map((res: Response) => {
                return res.json() || {};
            })

            // Handle any errors
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }
}
