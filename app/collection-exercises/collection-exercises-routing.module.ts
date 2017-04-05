import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CollectionExercises } from './collection-exercises.component';
import { CollectionExerciseListContainer } from './containers/collection-exercise-list.container';

const collectionExercisesRoutes:Routes = [
    {
        path: 'collection-exercises',
        component: CollectionExercises,
        children: [
            {
                path: '',
                component: CollectionExerciseListContainer
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
