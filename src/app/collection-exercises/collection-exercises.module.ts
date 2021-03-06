import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import 'rxjs/add/operator/toPromise';

import { BreadcrumbModule } from '../shared/breadcrumb/breadcrumb.module';
import { CollectionExerciseRoutingModule } from './collection-exercises-routing.module';

import { SurveysActions } from '../surveys/surveys.actions';
import { SurveysService } from '../surveys/surveys.service';

import { CollectionInstrumentsActions } from '../collection-instruments/collection-instruments.actions';
import { CollectionInstrumentsService } from '../collection-instruments/collection-instruments.service';

import { CollectionExerciseListContainerComponent } from './shared/collection-exercise-list/collection-exercise-list.container';
import { CollectionExerciseListComponent } from './shared/collection-exercise-list/collection-exercise-list.component';
import { CollectionExercisesComponent } from './collection-exercises.component';
import { CollectionExerciseDetailsContainerComponent } from './shared/collection-exercise-details/collection-exercise-details.container';
import { CollectionExerciseDetailsComponent } from './shared/collection-exercise-details/collection-exercise-details.component';
import { CollectionExercisesActions } from './collection-exercises.actions';
import { CollectionExercisesService } from './collection-exercises.service';

@NgModule({
    imports: [
        HttpModule,
        CommonModule,
        RouterModule,
        BreadcrumbModule,

        CollectionExerciseRoutingModule
    ],
    declarations: [
        CollectionExercisesComponent,
        CollectionExerciseListContainerComponent,
        CollectionExerciseListComponent,
        CollectionExerciseDetailsContainerComponent,
        CollectionExerciseDetailsComponent
    ],
    providers: [
        CollectionExercisesService,
        CollectionExercisesActions,
        CollectionInstrumentsService,
        CollectionInstrumentsActions,
        SurveysActions,
        SurveysService
    ]
})
export class CollectionExerciseModule { }
