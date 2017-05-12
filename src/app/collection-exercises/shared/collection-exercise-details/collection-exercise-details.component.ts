import { Component, Output, Input, EventEmitter } from '@angular/core';

import { CollectionExerciseDetailsViewModel } from '../collection-exercise.model';

@Component({
    moduleId: module.id,
    selector: 'ons-collection-exercise-details',
    templateUrl: './collection-exercise-details.component.html',
    styleUrls: ['./collection-exercise-details.component.scss']
})
export class CollectionExerciseDetailsComponent {

    @Input() collectionExerciseDetails: CollectionExerciseDetailsViewModel;

    @Output() load_cis_click_handler: EventEmitter<any> = new EventEmitter();

}
