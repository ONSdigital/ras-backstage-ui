import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import 'rxjs/add/operator/find';
import { Subscription } from 'rxjs/Subscription';

import { CollectionExerciseDetailsViewModel } from '../collection-exercise.model';
import { CollectionInstrumentsService } from '../../../collection-instruments/collection-instruments.service';


@Component({
    template: `
        <ons-collection-exercise-details
            [collectionExerciseDetails]="viewModel"
            (load_ci_batch_click_handler)="collectionInstrumentBatchLoadClick_handler($event)"></ons-collection-exercise-details>
    `
})
export class CollectionExerciseDetailsContainerComponent implements OnInit, OnDestroy {

    private routeSubscription: Subscription;
    public viewModel: CollectionExerciseDetailsViewModel;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private collectionInstrumentsService: CollectionInstrumentsService) { }

    ngOnInit() {

        /**
         * Check resolved params from route instead of reading Redux data store directly
         */
        this.routeSubscription = this.route.data
            .subscribe((data: { viewModel: CollectionExerciseDetailsViewModel }) => {
                if (data.viewModel) {
                    this.viewModel = data.viewModel;
                }
            });
    }

    ngOnDestroy() {
        this.routeSubscription.unsubscribe();
    }

    public collectionInstrumentBatchLoadClick_handler() {

        this.viewModel.isButtonDisabled = true;

        this.collectionInstrumentsService.loadCollectionInstrumentBatch(this.viewModel.id)
            .subscribe(res => {

                // TODO remove this delay
                // setTimeout(() => {

                    this.viewModel.collectionInstrumentBatch.status = res.status;

                // }, 3000);
            },
            err => {
                // Log any errors
                console.log(err);
            });
    }
}
