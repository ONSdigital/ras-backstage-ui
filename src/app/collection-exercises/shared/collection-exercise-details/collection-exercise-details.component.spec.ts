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


    it('should initialise with correct collection exercise template data', async(() => {
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

            expect(fixture.nativeElement.querySelector('[data-test="SURVEY_TITLE"]').innerHTML)
                .toEqual('Test survey name');

            expect(fixture.nativeElement.querySelector('[data-test="INQUIRY_CODE_LABEL"]').innerHTML)
                .toEqual('Inquiry code:');

            expect(fixture.nativeElement.querySelector('[data-test="INQUIRY_CODE_VALUE"]').innerHTML)
                .toEqual('789');


            expect(fixture.nativeElement.querySelector('[data-test="REFERENCE_PERIOD_LABEL"]').innerHTML)
                .toEqual('Reference period:');

            expect(fixture.nativeElement.querySelector('[data-test="REFERENCE_PERIOD_VALUE"]').innerHTML)
                .toEqual('Jan 2018');
        });
    }));

    it('should initialise with correct collection instruments template data', async(() => {
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

            expect(fixture.nativeElement.querySelector('[data-test="COLLECTION_INSTRUMENTS_HEADING"]').innerHTML)
                .toEqual('Collection instruments');

            expect(fixture.nativeElement.querySelector('[data-test="NO_COLLECTION_INSTRUMENTS_AVAILABLE_MESSAGE"]').innerHTML)
                .toEqual('No collection instruments available');

            expect(fixture.nativeElement.querySelector('[data-test="READY_TO_LOAD_MESSAGE"]').innerHTML)
                .toEqual('674 Excel files ready to load');

            expect(fixture.nativeElement.querySelector('[data-test="LOAD_COLLECTION_INSTRUMENTS_BUTTON"]').innerHTML)
                .toEqual('Load files');

            expect(fixture.nativeElement.querySelector('[data-test="LOADED_FILES_COUNT"]').innerHTML)
                .toEqual('674 Excel files loaded');
        });
    }));
});
