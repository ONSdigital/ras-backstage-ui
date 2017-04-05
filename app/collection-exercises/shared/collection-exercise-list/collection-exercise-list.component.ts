import { Component, Output, Input, EventEmitter } from '@angular/core';

import { CollectionExercise } from '../collection-exercise.model';

@Component({
    moduleId: module.id,
    selector: 'ons-collection-exercise-list'
})
export class CollectionExerciseList {

    @Input() collectionExercises:Array<CollectionExercise>;
    @Input() updateStub:Array<CollectionExercise>;

    @Output() update_click_handler = new EventEmitter();

}
