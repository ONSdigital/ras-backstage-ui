import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CollectionExercisesDetailsResolver } from './shared/collection-exercise-details/collection-exercise-details.resolver';

import { CollectionExercises } from './collection-exercises.component';
import { CollectionExerciseListContainer } from './shared/collection-exercise-list/collection-exercise-list.container';
import { CollectionExerciseDetailsContainer } from './shared/collection-exercise-details/collection-exercise-details.container';

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
                data: {
                    breadcrumb: (dataResolved:any) => {

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
        CollectionExercisesDetailsResolver
    ]
})
export class CollectionExerciseRoutingModule {}
