import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { CollectionExerciseDetailsViewModel } from '../collection-exercise.model';

@Component({
    template: `
        <ons-collection-exercise-details
            [collectionExerciseDetails]="collectionExerciseDetails"></ons-collection-exercise-details>
    `,
})
export class CollectionExerciseDetailsContainer {

    /*private breadCrumbTrail:Array<BreadcrumbItem> = [
        {
            label: 'Home',
            link: '/'
        },
        {
            label: 'Collection exercises',
            link: '/collection-exercises'
        },
        {
            label: 'BRES - 2016',
            link: '/collection-exercises/bres-2016',
            isCurrent: true
        }
    ];*/

    private collectionExerciseDetails:CollectionExerciseDetailsViewModel = {
        surveyTitle: 'Business Register and Employment Survey - 2016',
        inquiryCode: '221',
        referencePeriod: '1 Jan 2016 - 31 Dec 2016'
    };

    constructor(
        private route:ActivatedRoute,
        private router:Router) {}

}
