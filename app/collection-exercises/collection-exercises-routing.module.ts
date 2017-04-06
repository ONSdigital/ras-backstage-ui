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
                component: CollectionExerciseListContainer
            },
            {
                path: ':collection-exercise-ref',
                component: CollectionExerciseDetailsContainer
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
