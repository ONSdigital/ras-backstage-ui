import { Component, Output, Input, EventEmitter } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'ons-collection-exercise-list',
    templateUrl: './collection-exercise-list.component.html'
})
export class CollectionExerciseListComponent {

    @Input() collectionExercises: Array<any>;

}
