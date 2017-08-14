import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
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

    static BASE_URL = environment.endpoints.collectionInstrument;

    constructor(
        private http: Http,
        private router: Router) {}

    @CheckRequestAuthenticated()
    getStatus(collectionExerciseId: string): Observable<any> {

        const observable = this.http.get(
            CollectionInstrumentsService.BASE_URL + 'status/' + collectionExerciseId
        )
        .catch((response: any) => {
            console.log('Error response: ', response);
            return Observable.throw({ errorMessage: response._body, response });
        })
        .share();

        this.attachBadRequestCheck(observable, 'Error getting collection instrument status from collection instrument ' +
            'service');

        return observable;
    }

    @CheckRequestAuthenticated()
    loadCollectionInstrumentBatch(collectionExerciseId: string): Observable<any> {

        const headers = new Headers({ 'Content-Type': 'application/json' });
        const options = new RequestOptions({ headers: headers });

        const observable = this.http.put(
            CollectionInstrumentsService.BASE_URL + 'activate/' + collectionExerciseId, {}, options
        )
        .catch((response: any) => {
            console.log('Error response: ', response);
            return Observable.throw({ errorMessage: response._body, response });
        })
        .share();

        this.attachBadRequestCheck(observable, 'Error loading collection instrument batch in collection instrument ' +
            'service');

        return observable;
    }

    private attachBadRequestCheck (observable: Observable<any>, errorHeading: string): void {

        observable.subscribe(
            () => {},
            (err: any) => {
                console.log('Bad request: ', err);
                this.router.navigate(['/server-error'], {
                    queryParams: {
                        errorResponseCode: err.response.status,
                        errorHeading: errorHeading,
                        errorBody: 'Collection instrument service error: ' + err.errorMessage
                    }
                });
            }
        );
    }
}
