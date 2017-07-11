import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { CollectionExercise } from './shared/collection-exercise.model';
import { environment } from '../../environments/environment';

@Injectable()
export class CollectionExercisesService {

    private BASE_URL = environment.endpoints.collectionExercise;

    constructor(private http: Http) { }

    // Get a single collection exercise
    getCollectionExercise(id: string): Observable<CollectionExercise> {

        return this.http.get(this.BASE_URL + 'collectionexercises/' + id)
            .share()

            // Handle the response
            .map((res: Response) => {
                return res.json() || {};
            })
            .share()

            // Handle any errors
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    // Fetch all existing collection exercises
    getCollectionExercises(): Observable<CollectionExercise[]> {

        return this.http.get(this.BASE_URL + 'collectionexercises')

            // Handle the response
            .map((res: Response) => {
                return res.json() || {};
            })

            // Handle any errors
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }
}
