import { Injectable } from '@angular/core';
import { Http, RequestOptions, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { AuthenticationService, CheckRequestAuthenticated } from '../authentication/authentication.service';
import { CheckBadRequest, handleError, printResponse } from '../shared/utils';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { CollectionInstrument } from './shared/collection-instrument.model';
import { environment } from '../../environments/environment';

@Injectable()
export class CollectionInstrumentsService {

    static label = 'Collection instrument service';

    static BASE_URL = environment.endpoints.collectionInstrument;

    constructor(
        private http: Http,
        private authenticationService: AuthenticationService) {}

    @CheckBadRequest({
        errorHeading: 'Error getting collection instrument status from collection instrument service',
        serviceClass: CollectionInstrumentsService
    })
    @CheckRequestAuthenticated()
    getStatus(collectionExerciseId: string): Observable<any> {

        return this.http.get(
            CollectionInstrumentsService.BASE_URL + 'status/' + collectionExerciseId,
            new RequestOptions({
                method: RequestMethod.Get,
                headers: this.authenticationService.encryptedHeaders
            })
        )
        .catch((response: any) => {
            console.log('Error response: ', response);
            return Observable.throw({ errorMessage: response._body, response });
        })
        .do(printResponse.bind(this, 'Get collection instrument status'))
        .catch(handleError)
        .share();
    }

    @CheckBadRequest({
        errorHeading: 'Error loading collection instrument batch in collection instrument service',
        serviceClass: CollectionInstrumentsService
    })
    @CheckRequestAuthenticated()
    loadCollectionInstrumentBatch(collectionExerciseId: string): Observable<any> {

        return this.http.put(
            CollectionInstrumentsService.BASE_URL + 'activate/' + collectionExerciseId,
            new RequestOptions({
                method: RequestMethod.Put,
                headers: this.authenticationService.encryptedHeaders
            })
        )
        .do(printResponse.bind(this, 'Load collection instrument batch'))
        .catch(handleError)
        .share();
    }
}
