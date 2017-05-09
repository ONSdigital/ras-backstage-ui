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
            fixture.detectChanges();

            const listItems = fixture.debugElement.queryAllNodes(By.css('.collection-exercise-summary'));

            fixture.whenStable().then(() => {
                fixture.detectChanges();

                expect(listItems.length).toEqual(2);
                expect(listItems[0].nativeNode.innerText).toEqual('Test survey name');
                expect(listItems[1].nativeNode.innerText).toEqual('Another test survey name');

                const anchor1 = listItems[0].nativeNode.children[0],
                    anchor2 = listItems[1].nativeNode.children[0];

                expect(anchor1.href).toContain('/collection-exercise/1');
                expect(anchor2.href).toContain('/collection-exercise/2');
            });
        });
    }));

});
