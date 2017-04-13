import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CollectionExercises } from './collection-exercises.component';
import { CollectionExerciseListContainer } from './containers/collection-exercise-list.container';
import { CollectionExerciseDetailsContainer } from './containers/collection-exercise-details.container';

const collectionExercisesRoutes:Routes = [
    {
        path: 'collection-exercises',
        component: CollectionExercises,
        children: [
            {
                path: '',
                component: CollectionExerciseListContainer/*,
                data: {
                    breadcrumb: "Collection Exercises"
                }*/
            },
            {
                path: ':collection-exercise-ref',
                component: CollectionExerciseDetailsContainer/*,
                data: {
                    breadcrumb: "Collection Exercises Details"
                }*/
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
    ]
})
export class CollectionExerciseRoutingModule {}
