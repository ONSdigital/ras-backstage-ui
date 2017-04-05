import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import 'rxjs/add/operator/toPromise';

import { CollectionExerciseRoutingModule } from './collection-exercises-routing.module';
import { CollectionExercises } from './collection-exercises.component';

@NgModule({
    imports: [
        HttpModule,
        RouterModule,

        CollectionExerciseRoutingModule
    ],
    declarations: [
        CollectionExercises
    ]
})
export class CollectionExerciseModule {}
