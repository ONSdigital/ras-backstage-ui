import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { CollectionExerciseModule } from '../../collection-exercises.module';
import { CollectionExerciseDetailsComponent } from './collection-exercise-details.component';

let fixture: ComponentFixture<any>,
    instance: any;

describe('CollectionExerciseDetailsComponent component', () => {

    beforeEach(() => {

        TestBed.configureTestingModule({
            imports: [
                CollectionExerciseModule
            ]
        });
    });

    it('should initialise correctly', async(() => {
        fixture = TestBed.createComponent(CollectionExerciseDetailsComponent);
        instance = fixture.componentInstance;

        fixture.detectChanges();
        fixture.whenStable().then(() => {
            fixture.detectChanges();
        });

        const comp = fixture.debugElement.componentInstance;
        expect(comp).toBeTruthy();
    }));


    it('should initialise with correct template data', async(() => {
        fixture = TestBed.createComponent(CollectionExerciseDetailsComponent);
        instance = fixture.componentInstance;

        instance.collectionExerciseDetails = {
            surveyTitle: 'Test survey name',
            inquiryCode: 789,
            referencePeriod: 'Jan 2018'
        };

        fixture.detectChanges();
        fixture.whenStable().then(() => {
            fixture.detectChanges();

            const headingEl = fixture.debugElement.query(By.css('h1')).nativeElement,
                inquiryCodeEl = fixture.debugElement.query(By.css('.inquiry-code')).nativeElement,
                referencePeriodEl = fixture.debugElement.query(By.css('.reference-period')).nativeElement;

            expect(headingEl.innerText).toEqual('Test survey name');
            expect(inquiryCodeEl.innerText).toEqual('789');
            expect(referencePeriodEl.innerText).toEqual('Jan 2018');
        });
    }));
});
