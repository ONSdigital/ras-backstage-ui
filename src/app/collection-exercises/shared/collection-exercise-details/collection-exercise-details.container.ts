import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import 'rxjs/add/operator/find';
import { Subscription } from 'rxjs/Subscription';

import { CollectionExercisesActions } from '../../collection-exercises.actions';
import { CollectionExerciseDetailsViewModel } from '../collection-exercise.model';

@Component({
    template: `
        <ons-collection-exercise-details
            [collectionExerciseDetails]="viewModel"
            (load_cis_click_handler)="collectionInstrumentLoadClick_handler($event)"></ons-collection-exercise-details>
    `
})
export class CollectionExerciseDetailsContainerComponent implements OnInit, OnDestroy {

    private routeSubscription: Subscription;
    public viewModel: CollectionExerciseDetailsViewModel;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private collectionExerciseActions: CollectionExercisesActions) { }

    ngOnInit() {

        /**
         * Check resolved params from route instead of reading Redux data store directly
         */
        this.routeSubscription = this.route.data
            .subscribe((data: { viewModel: CollectionExerciseDetailsViewModel }) => {
                if (data.viewModel) {
                    this.viewModel = data.viewModel;

                    // TODO remove this
                    console.log(this.viewModel);
                }
            });
    }

    ngOnDestroy() {
        this.routeSubscription.unsubscribe();
    }

    public collectionInstrumentLoadClick_handler() {
        this.collectionExerciseActions.loadCollectionInstrumentBundle('123');
    }
}
