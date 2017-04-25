import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
    template: `
        <h1 class="saturn">Collection exercises</h1>
        <ons-collection-exercise-list
            [collectionExercises]="collectionExercisesList"></ons-collection-exercise-list>
    `,
})
export class CollectionExerciseListContainer implements OnInit {

    private collectionExercisesList:Array<any> = [
        {
            title: 'Business Register and Employment Survey - 2016',
            link: '/collection-exercises/bres-2016'
        }
    ];

    constructor(
        private route:ActivatedRoute) {}

    ngOnInit() {

    }

}
