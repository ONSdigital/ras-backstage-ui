import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CollectionExerciseDetailsViewModel } from '../shared/collection-exercise.model';

@Component({
    template: `
        <ons-collection-exercise-details
            [surveyTitle]="title"
            [collecttionExerciseDetails]="collectionExerciseDetails">
        </ons-collection-exercise-details>
    `,
})
export class CollectionExerciseDetailsContainer {

    private title:String = 'BRES';

    private collectionExerciseDetails:CollectionExerciseDetailsViewModel = {
        surveyTitle: 'Business Register and Employment Survey - 2016'
    };

    constructor(
        private route:ActivatedRoute) {}

}
