import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

import { CollectionExerciseModule } from '../../collection-exercises.module';
import { CollectionExerciseListComponent } from './collection-exercise-list.component';

let fixture: ComponentFixture<any>,
    instance: any;

describe('CollectionExerciseListComponent component', () => {

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
                CollectionExerciseModule
            ]
        });
    });

    it('should initialise correctly', async(() => {
        fixture = TestBed.createComponent(CollectionExerciseListComponent);
        instance = fixture.componentInstance;

        fixture.detectChanges();
        fixture.whenStable().then(() => {
            fixture.detectChanges();
        });

        const comp = fixture.debugElement.componentInstance;
        expect(comp).toBeTruthy();
    }));

    it('should initialise with correct template data', async(() => {
        // TODO - no point in testing this at the moment as the screen is likely to change
        // fixture = TestBed.createComponent(CollectionExerciseListComponent);
        // instance = fixture.componentInstance;
        //
        //
        // instance.collectionExercises =  [{
        //      'id': 'c6467711-21eb-4e78-804c-1db8392f93fb',
        //      'name': '201601',
        //      'scheduledExecution': '2017-05-15T00:00:00Z'
        //  }, {
        //      'id': 'e33daf0e-6a27-40cd-98dc-c6231f50e84a',
        //      'name': '201602',
        //      'scheduledExecution': '2017-08-12T00:00:00Z'
        //  }];
        //
        // fixture.detectChanges();
        // fixture.whenStable().then(() => {
        //     const item0 = fixture.nativeElement.querySelector('[data-test="COLLECTION_EXERCISE_LIST_ITEM_0"]');
        //     const item1 = fixture.nativeElement.querySelector('[data-test="COLLECTION_EXERCISE_LIST_ITEM_1"]');
        //     const item2 = fixture.nativeElement.querySelector('[data-test="COLLECTION_EXERCISE_LIST_ITEM_2"]');
        //
        //     expect(item0).not.toBeNull();
        //     expect(item1).not.toBeNull();
        //     expect(item2).toBeNull();
        //
        //     expect(item0.innerText).toEqual('Business Register and Employment Survey - ' + instance.collectionExercises[0].name);
        //     expect(item0.href).toContain(instance.collectionExercises[0].id);
        //
        //     expect(item1.innerText).toEqual('Business Register and Employment Survey - ' + instance.collectionExercises[1].name);
        //     expect(item1.href).toContain(instance.collectionExercises[1].id);
        // });
    }));

});
