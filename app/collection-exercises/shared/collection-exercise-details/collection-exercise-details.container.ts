import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { CollectionExerciseDetailsViewModel } from '../collection-exercise.model';
import { CollectionExercisesActions } from '../../collection-exercises.actions';
import { CollectionExercise } from '../collection-exercise.model';

@Component({
    template: `
        <ons-collection-exercise-details
            [collectionExerciseDetails]="collectionExerciseDetails"
            (load_cis_click_handler)="onCollectionInstrumentLoadClick_handler($event)"></ons-collection-exercise-details>
    `,
})
export class CollectionExerciseDetailsContainer implements OnInit {

    @select('collectionExercises')
    private collectionExercisesStore: Observable<Array<CollectionExercise>>;
    private collectionExercises: Array<CollectionExercise> = [];
    private collectionExercisesSubscription:Subscription;

    /**
     * temp
     */
    private collectionExerciseDetails:CollectionExerciseDetailsViewModel = {
        surveyTitle: 'Business Register and Employment Survey - 2016',
        inquiryCode: '221',
        referencePeriod: '1 Jan 2016 - 31 Dec 2016'
    };

    constructor(
        private route:ActivatedRoute,
        private router:Router,
        private collectionExerciseActions:CollectionExercisesActions) {}

    ngOnInit() {
        this.collectionExercisesStore
            .subscribe((collectionExercises: any) => {

                /**
                 * Map to correct collection exercise
                 */
                console.log(collectionExercises);
                //this.collectionExercises = collectionExercises.items;
            });
    }

    ngOnDestroy() {
        this.collectionExercisesSubscription.unsubscribe();
    }

    private onCollectionInstrumentLoadClick_handler() {
        this.collectionExerciseActions.getCollectionExercise('123');
    }
}
