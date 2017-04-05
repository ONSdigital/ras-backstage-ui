import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CollectionExercises } from './collection-exercises.component';

const collectionExercisesRoutes:Routes = [
    {
        path: 'collection-exercises',
        component: CollectionExercises
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
