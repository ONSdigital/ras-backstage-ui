import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import 'rxjs/add/operator/find';

import { select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { CollectionExercisesActions } from '../../collection-exercises.actions';
import { CollectionExercise, CollectionExerciseDetailsViewModel } from '../collection-exercise.model';

@Component({
    template: `
        <ons-collection-exercise-details
            [collectionExerciseDetails]="collectionExerciseViewModel"
            (load_cis_click_handler)="collectionInstrumentLoadClick_handler($event)"></ons-collection-exercise-details>
    `,
})
export class CollectionExerciseDetailsContainer implements OnInit {

    @select('collectionExercises')
    private collectionExercisesStore:Observable<Array<CollectionExercise>>;
    private collectionExerciseSubscription:Subscription;

    /**
     * temp
     */
    private collectionExerciseViewModel:CollectionExerciseDetailsViewModel = {
        surveyTitle: 'Business Register and Employment Survey - 2016',
        inquiryCode: '221',
        referencePeriod: '1 Jan 2016 - 31 Dec 2016'
    };

    constructor(
        private route:ActivatedRoute,
        private router:Router,
        private collectionExerciseActions:CollectionExercisesActions) {}

    ngOnInit() {

        /**
         * Check resolved params from route instead of reading Redux data store directly
         */
        this.route.data
            .subscribe((data:{ viewModel:CollectionExerciseDetailsViewModel }) => {
                this.collectionExerciseViewModel = data.viewModel;
            });


        /*this.collectionExerciseSubscription = this.collectionExercisesStore
            .find((collectionExercises:Array<CollectionExercise>, index:number) => {
                return true;
            })
            .subscribe((collectionExercises:Array<CollectionExercise>) => {

                /!**
                 * TODO
                 * Map to correct collection exercise - observable map
                 * Create collectionExerciseViewModel from collectionExercise, survey, collectionInstrument
                 *!/

                console.log('Container: ', collectionExercises);
                //this.collectionExerciseViewModel = ?; //Save collection exercises under items
            });*/
    }

    ngOnDestroy() {
        this.collectionExerciseSubscription.unsubscribe();
    }

    private collectionInstrumentLoadClick_handler() {
        console.log('load ci');
    }
}
