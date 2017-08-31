import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { CheckBadRequest, handleError, printResponse } from '../shared/utils';
import { AuthenticationService, CheckRequestAuthenticated } from '../authentication/authentication.service';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { CollectionExercise } from './shared/collection-exercise.model';
import { environment } from '../../environments/environment';

@Injectable()
export class CollectionExercisesService {

    static label = 'Collection exercise service';

    static BASE_URL = environment.endpoints.collectionExercise;

    constructor(
        private http: Http,
        private authenticationService: AuthenticationService) {}

    // Get a single collection exercise
    @CheckBadRequest({
        errorHeading: 'Error getting collection exercise in collection exercise service',
        serviceClass: CollectionExercisesService
    })
    @CheckRequestAuthenticated()
    getCollectionExercise(id: string): Observable<CollectionExercise> {

        return this.http.get(
            CollectionExercisesService.BASE_URL + 'collectionexercises/' + id,
            new RequestOptions({
                method: RequestMethod.Get,
                headers: this.authenticationService.encryptedHeaders
            })
        )
        .map((res: Response) => {
            return res.json() || {};
        })
        .do(printResponse.bind(this, 'Get collection exercise'))
        .catch(handleError)
        .share();
    }

    // Fetch all existing collection exercises
    @CheckBadRequest({
        errorHeading: 'Error getting a list of collection exercises from collection exercise service',
        serviceClass: CollectionExercisesService
    })
    @CheckRequestAuthenticated()
    getCollectionExercises(): Observable<CollectionExercise[]> {

        return this.http.get(
            CollectionExercisesService.BASE_URL + 'collectionexercises',
            new RequestOptions({
                method: RequestMethod.Get,
                headers: this.authenticationService.encryptedHeaders
            })
        )

        .map((res: Response) => {
            return res.json() || {};
        })
        .do(printResponse.bind(this, 'Get collection exercises'))
        .catch(handleError)
        .share();
    }
}
