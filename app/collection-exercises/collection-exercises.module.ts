import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import 'rxjs/add/operator/toPromise';

import { CollectionExerciseRoutingModule } from './collection-exercises-routing.module';
import { CollectionExerciseListContainer } from './containers/collection-exercise-list.container';
import { CollectionExerciseList } from './shared/collection-exercise-list/collection-exercise-list.component';
import { CollectionExercises } from './collection-exercises.component';
import { CollectionExerciseDetailsContainer } from './containers/collection-exercise-details.container';
import { CollectionExerciseDetails } from './shared/collection-exercise-details/collection-exercise-details.component';

import { Breadcrumb } from '../shared/breadcrumb/breadcrumb.component';

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
        CollectionExerciseList,
        CollectionExerciseDetailsContainer,
        CollectionExerciseDetails,

        Breadcrumb
    ]
})
export class CollectionExerciseModule {}
