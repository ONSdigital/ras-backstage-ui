import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { BreadcrumbItem } from '../../shared/breadcrumb/breadcrumb-item.model';

@Component({
    template: `
        <ons-breadcrumb
            [trail]="breadCrumbTrail"></ons-breadcrumb>
            
        <h1 class="saturn">Collection exercises</h1>
        <ons-collection-exercise-list
            [collectionExercises]="collectionExercisesList"></ons-collection-exercise-list>
    `,
})
export class CollectionExerciseListContainer {

    private breadCrumbTrail:Array<BreadcrumbItem> = [
        {
            label: 'Home',
            link: '/'
        },
        {
            label: 'Collection exercises',
            link: '/collection-exercises',
            isCurrent: true
        }
    ];

    private collectionExercisesList:Array<any> = [
        {
            title: 'Business Register and Employment Survey - 2016',
            link: '/collection-exercises/bres-2016'
        }
    ];

    constructor(
        private route:ActivatedRoute) {}

}
