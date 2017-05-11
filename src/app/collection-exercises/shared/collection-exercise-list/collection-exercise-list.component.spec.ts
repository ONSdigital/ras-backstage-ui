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
        fixture = TestBed.createComponent(CollectionExerciseListComponent);
        instance = fixture.componentInstance;

        instance.collectionExercises = [{
                surveyTitle: 'Test survey name',
                link: '/collection-exercise/1'
            },
            {
                surveyTitle: 'Another test survey name',
                link: '/collection-exercise/2'
            }];

        fixture.detectChanges();
        fixture.whenStable().then(() => {
            const item0 = fixture.nativeElement.querySelector('[data-test="COLLECTION_EXERCISE_LIST_ITEM_0"]');
            const item1 = fixture.nativeElement.querySelector('[data-test="COLLECTION_EXERCISE_LIST_ITEM_1"]');
            const item2 = fixture.nativeElement.querySelector('[data-test="COLLECTION_EXERCISE_LIST_ITEM_2"]');

            expect(item0).not.toBeNull();
            expect(item1).not.toBeNull();
            expect(item2).toBeNull();

            expect(item0.innerText).toEqual(instance.collectionExercises[0].surveyTitle);
            expect(item0.href).toContain(instance.collectionExercises[0].link);

            expect(item1.innerText).toEqual(instance.collectionExercises[1].surveyTitle);
            expect(item1.href).toContain(instance.collectionExercises[1].link);
        });
    }));

});
