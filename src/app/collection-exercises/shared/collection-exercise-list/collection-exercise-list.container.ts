import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { CollectionExerciseListViewModel } from '../collection-exercise.model';

@Component({
    template: `
        <h1 data-test="COLLECTION_EXERCISE_LIST_HEADING" class="saturn">Collection exercises</h1>
        <ons-collection-exercise-list
            [collectionExercises]="viewModel.collectionExercises"></ons-collection-exercise-list>
    `
})
export class CollectionExerciseListContainerComponent implements OnInit, OnDestroy {

    public routeSubscription: Subscription;
    public viewModel: CollectionExerciseListViewModel = {
        collectionExercises: []
    };

    constructor(
        private route: ActivatedRoute) { }

    ngOnInit() {

        this.routeSubscription = this.route.data
            .subscribe(
                (data: { viewModel: CollectionExerciseListViewModel }) => {
                    if (data.viewModel) {
                        this.viewModel = data.viewModel;
                    }
                },
                (err: any) => console.log('Error: ', err)
            );
    }

    ngOnDestroy() {
        this.routeSubscription.unsubscribe();
    }

}
