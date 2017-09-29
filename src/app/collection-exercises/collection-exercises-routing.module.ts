import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CollectionExercisesComponent } from './collection-exercises.component';
import { CollectionExerciseListContainerComponent } from './shared/collection-exercise-list/collection-exercise-list.container';
import { CollectionExerciseDetailsContainerComponent } from './shared/collection-exercise-details/collection-exercise-details.container';
import { CollectionExerciseDetailsResolver } from './shared/collection-exercise-details/collection-exercise-details.resolver.service';
import { CollectionExerciseListResolver } from './shared/collection-exercise-list/collection-exercise-list.resolver.service';

import { CollectionExerciseDetailsViewModel } from './shared/collection-exercise.model';

import { CanActivateAuthentication } from '../authentication/shared/authentication-route-guard.resolver';

export const collectionExercisesRoutes: Routes = [
    {
        path: 'collection-exercises',
        component: CollectionExercisesComponent,
        canActivate: [CanActivateAuthentication],
        data: {
            breadcrumb: null // 'Collection Exercises' - Reactivate when service is ready
        },
        children: [
            {
                path: '',
                component: CollectionExerciseListContainerComponent,
                resolve: {
                    viewModel: CollectionExerciseListResolver
                },
                data: {
                    title: 'Collection exercises - ONS Data Collection',
                    breadcrumb: null
                }
            },
            {
                path: ':collection-exercise-ref',
                component: CollectionExerciseDetailsContainerComponent,
                resolve: {
                    exported: CollectionExerciseDetailsResolver
                },
                data: {
                    title: 'Collection exercise - ONS Data Collection',
                    breadcrumb: resolveCollectionExerciseDetailsBreadcrumb
                }
            }
        ]
    }
];

export function resolveCollectionExerciseDetailsBreadcrumb(dataResolved: {exported: any}): string {
    return dataResolved.exported.collectionExercise.name;
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
