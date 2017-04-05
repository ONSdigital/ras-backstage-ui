import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import 'rxjs/add/operator/toPromise';

import { CollectionExerciseRoutingModule } from './collection-exercises-routing.module';
import { CollectionExerciseListContainer } from './containers/collection-exercise-list.container';
import { CollectionExerciseList } from './shared/collection-exercise-list/collection-exercise-list.component';
import { CollectionExercises } from './collection-exercises.component';

@NgModule({
    imports: [
        HttpModule,
        CommonModule,
        RouterModule,

        CollectionExerciseRoutingModule
    ],
    declarations: [
        CollectionExercises,
        CollectionExerciseListContainer,
        CollectionExerciseList
    ]
})
export class CollectionExerciseModule {}
