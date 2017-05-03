import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CollectionExercisesComponent } from './collection-exercises.component';
import { CollectionExerciseListContainerComponent } from './shared/collection-exercise-list/collection-exercise-list.container';
import { CollectionExerciseDetailsContainerComponent } from './shared/collection-exercise-details/collection-exercise-details.container';
import { CollectionExerciseDetailsResolver } from './shared/collection-exercise-details/collection-exercise-details-resolver.service';
import { CollectionExerciseListResolver } from './shared/collection-exercise-list/collection-exercise-list-resolver.service';

import { CollectionExerciseDetailsViewModel } from './shared/collection-exercise.model';

export const collectionExercisesRoutes: Routes = [
    {
        path: 'collection-exercises',
        component: CollectionExercisesComponent,
        data: {
            breadcrumb: 'Collection Exercises'
        },
        children: [
            {
                path: '',
                component: CollectionExerciseListContainerComponent,
                resolve: {
                    viewModel: CollectionExerciseListResolver
                },
                data: {
                    breadcrumb: null
                }
            },
            {
                path: ':collection-exercise-ref',
                component: CollectionExerciseDetailsContainerComponent,
                resolve: {
                    viewModel: CollectionExerciseDetailsResolver
                },
                data: {
                    breadcrumb: resolveCollectionExerciseDetailsBreadcrumb
                }
            }
        ]
    }
];

export function resolveCollectionExerciseDetailsBreadcrumb(dataResolved: any): string {

    const viewModel: CollectionExerciseDetailsViewModel = dataResolved.viewModel;

    return viewModel.surveyAbbr;
}

@NgModule({
    imports: [
        RouterModule.forChild(collectionExercisesRoutes)
    ],
    exports: [
        RouterModule
    ],
    providers: [
        CollectionExerciseDetailsResolver,
        CollectionExerciseListResolver
    ]
})
export class CollectionExerciseRoutingModule { }
