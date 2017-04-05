import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { CollectionExercise } from '../shared/collection-exercise.model';

@Component({
    template: `
        <h1 class="saturn">Collection exercises</h1>
        <ul>
            <li><a href="/collection-exercises/bres-2016/">Business Register and Employment Survey - 2016</a></li>
        </ul>
    `,
})
export class CollectionExerciseListContainer {

    private collectionExercises: Array<CollectionExercise> = [];

    constructor(
        private route:ActivatedRoute) {}

}
