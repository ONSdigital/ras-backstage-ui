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
    getCollectionExercise(id: number): Observable<CollectionExercise> {

        return this.http.get(this.BASE_URL + 'collection-exercise/' + id)

            // Call .json() on the response to return data
            .map((res: Response) => res.json().data.collectionExercise || {})

            // Handle any errors
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    // Fetch all existing collection exercises
    getCollectionExercises(): Observable<CollectionExercise[]> {

        return this.http.get(this.BASE_URL + 'collection-exercises')

            // Call .json() on the response to return data
            .map((res: Response) => res.json().data || {})

            // Handle any errors
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    loadCollectionInstrumentBatch(collectionExerciseRef: string): Promise<any> {




        // TODO refactor to use on Observable instead
        return Promise.resolve();
    }
}
