import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { CheckRequestAuthenticated } from '../authentication/authentication.service';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { CollectionExercise } from './shared/collection-exercise.model';
import { environment } from '../../environments/environment';

@Injectable()
export class CollectionExercisesService {

    private BASE_URL = environment.endpoints.collectionExercise;

    constructor(
        private http: Http,
        private router: Router) {}

    // Get a single collection exercise
    @CheckRequestAuthenticated()
    getCollectionExercise(id: string): Observable<CollectionExercise> {

        const observable = this.http.get(
            this.BASE_URL + 'collectionexercises/' + id
        )

        .map((res: Response) => {
            return res.json() || {};
        })

        .catch((response: any) => {
            console.log('Error response: ', response);
            return Observable.throw({ errorMessage: response._body, response });
        })
        .share();

        this.attachBadRequestCheck(observable, 'Error getting collection exercise in collection exercise service');

        return observable;
    }

    // Fetch all existing collection exercises
    @CheckRequestAuthenticated()
    getCollectionExercises(): Observable<CollectionExercise[]> {

        const observable = this.http.get(
            this.BASE_URL + 'collectionexercises'
        )

        .map((res: Response) => {
            return res.json() || {};
        })
        .share()

        .catch((response: any) => {
            console.log('Error response: ', response);
            return Observable.throw({ errorMessage: response._body, response });
        })
        .share();

        this.attachBadRequestCheck(observable, 'Error getting a list of collection exercises from collection exercise ' +
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
                        errorBody: 'Collection exercise service error: ' + err.errorMessage
                    }
                });
            }
        );
    }
}
