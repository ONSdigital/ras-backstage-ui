import { Component, Output, Input, EventEmitter } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'ons-collection-exercise-details',
    templateUrl: './collection-exercise-details.component.html'
})
export class CollectionExerciseDetails {

    @Input() surveyTitle:Array<any>;
    @Input() collecttionExerciseDetails:Array<any>;

}
