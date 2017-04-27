import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { CollectionExerciseListViewModel } from '../collection-exercise.model';

@Component({
    template: `
        <h1 class="saturn">Collection exercises</h1>
        <ons-collection-exercise-list
            [collectionExercises]="viewModel.collectionExercises"></ons-collection-exercise-list>
    `,
})
export class CollectionExerciseListContainer implements OnInit, OnDestroy {

    private routeSubscription:Subscription;
    private viewModel:CollectionExerciseListViewModel;

    /*private collectionExercisesList:Array<any> = [
        {
            surveyTitle: 'Business Register and Employment Survey - 2016',
            link: '/collection-exercises/bres-2016'
        }
    ];*/

    constructor(
        private route:ActivatedRoute) {}

    ngOnInit() {

        this.routeSubscription = this.route.data
            .subscribe((data:{ viewModel:CollectionExerciseListViewModel }) => {
                this.viewModel = data.viewModel;
            });
    }

    ngOnDestroy() {
        this.routeSubscription.unsubscribe();
    }

}
