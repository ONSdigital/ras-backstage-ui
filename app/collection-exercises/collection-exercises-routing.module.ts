import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CollectionExercises } from './collection-exercises.component';
import { CollectionExerciseListContainer } from './shared/collection-exercise-list/collection-exercise-list.container';
import { CollectionExerciseDetailsContainer } from './shared/collection-exercise-details/collection-exercise-details.container';
import { CollectionExerciseDetailsResolver } from './shared/collection-exercise-details/collection-exercise-details-resolver.service';

import { CollectionExercise } from './shared/collection-exercise.model';

const collectionExercisesRoutes:Routes = [
    {
        path: 'collection-exercises',
        component: CollectionExercises,
        data: {
            breadcrumb: "Collection Exercises"
        },
        children: [
            {
                path: '',
                component: CollectionExerciseListContainer,
                data: {
                    breadcrumb: null
                }
            },
            {
                path: ':collection-exercise-ref',
                component: CollectionExerciseDetailsContainer,
                resolve: {
                    details: CollectionExerciseDetailsResolver
                },
                data: {
                    breadcrumb: (dataResolved:any) => {

                        let collectionExercise:CollectionExercise = dataResolved.details;

                        console.log('resolved', collectionExercise);

                        /**
                         * Get resolved data from end point
                         */
                        return 'Bres 2016';
                    }
                }
            }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(collectionExercisesRoutes)
    ],
    exports: [
        RouterModule
    ],
    providers: [
        CollectionExerciseDetailsResolver
    ]
})
export class CollectionExerciseRoutingModule {}
