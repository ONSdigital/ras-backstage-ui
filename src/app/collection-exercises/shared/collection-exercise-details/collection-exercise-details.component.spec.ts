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
            inquiryCode: '99999',
            referencePeriod: '1 Jan 2016 - 31 Dec 2016',
            collectionInstrumentBatch: {
                current: 0,
                status: 'pending'
            }
        };

        fixture.detectChanges();
        fixture.whenStable().then(() => {

            // Correct survey heading should be displayed
            expect(fixture.nativeElement.querySelector('[data-test="SURVEY_TITLE"]').innerHTML)
                .toEqual(instance.collectionExerciseDetails.surveyTitle);

            expect(fixture.nativeElement.querySelector('[data-test="INQUIRY_CODE_LABEL"]').innerHTML)
                .toEqual('Inquiry code:');

            expect(fixture.nativeElement.querySelector('[data-test="INQUIRY_CODE_VALUE"]').innerHTML)
                .toEqual(instance.collectionExerciseDetails.inquiryCode);

            expect(fixture.nativeElement.querySelector('[data-test="REFERENCE_PERIOD_LABEL"]').innerHTML)
                .toEqual('Reference period:');

            expect(fixture.nativeElement.querySelector('[data-test="REFERENCE_PERIOD_VALUE"]').innerHTML)
                .toEqual(instance.collectionExerciseDetails.referencePeriod);
        });
    }));

    it('should show the correct collection template data when there are no collection instruments available', async(() => {
        fixture = TestBed.createComponent(CollectionExerciseDetailsComponent);
        instance = fixture.componentInstance;

        instance.collectionExerciseDetails = {
            surveyTitle: 'Test survey name',
            inquiryCode: '99999',
            referencePeriod: '1 Jan 2016 - 31 Dec 2016',
            collectionInstrumentBatch: {
                current: 0,
                status: 'pending'
            }
        };

        fixture.detectChanges();
        fixture.whenStable().then(() => {

            // Correct collection instrument heading should be displayed
            expect(fixture.nativeElement.querySelector('[data-test="COLLECTION_INSTRUMENTS_HEADING"]').innerHTML)
                .toEqual('Collection instruments');

            // Correct 'no data' message should be displayed
            expect(fixture.nativeElement.querySelector('[data-test="NO_COLLECTION_INSTRUMENTS_AVAILABLE_MESSAGE"]').innerHTML)
                .toEqual('No collection instruments available');
        });
    }));

    it('should show the correct collection template data when there are some collection instruments available to be loaded', async(() => {
        fixture = TestBed.createComponent(CollectionExerciseDetailsComponent);
        instance = fixture.componentInstance;

        instance.collectionExerciseDetails = {
            surveyTitle: 'Test survey name',
            inquiryCode: '99999',
            referencePeriod: '1 Jan 2016 - 31 Dec 2016',
            collectionInstrumentBatch: {
                current: 999,
                status: 'pending'
            }
        };

        fixture.detectChanges();
        fixture.whenStable().then(() => {

            // Correct collection instrument heading should be displayed
            expect(fixture.nativeElement.querySelector('[data-test="COLLECTION_INSTRUMENTS_HEADING"]').innerHTML)
                .toEqual('Collection instruments');

            // Ready to load message should be displayed with correct count
            expect(fixture.nativeElement.querySelector('[data-test="READY_TO_LOAD_MESSAGE"]').innerHTML)
                .toEqual('999 Excel files ready to load');

            // Load files button should be displayed
            expect(fixture.nativeElement.querySelector('[data-test="LOAD_COLLECTION_INSTRUMENTS_BUTTON"]').innerHTML)
                .toEqual('Load files');
        });
    }));

    it('should show the correct collection template data when collection instruments have been loaded', async(() => {
        fixture = TestBed.createComponent(CollectionExerciseDetailsComponent);
        instance = fixture.componentInstance;

        instance.collectionExerciseDetails = {
            surveyTitle: 'Test survey name',
            inquiryCode: '99999',
            referencePeriod: '1 Jan 2016 - 31 Dec 2016',
            collectionInstrumentBatch: {
                current: 999,
                status: 'active'
            },
            csvEndpoint: 'endpoint-here'
        };

        fixture.detectChanges();
        fixture.whenStable().then(() => {

            // Correct collection instrument heading should be displayed
            expect(fixture.nativeElement.querySelector('[data-test="COLLECTION_INSTRUMENTS_HEADING"]').innerHTML)
                .toEqual('Collection instruments');

            // Tick icon should be displayed
            expect(fixture.nativeElement.querySelector('[data-test="LOADED_BATCH_CHECK_ICON"]')).not.toBeNull();

            // Correct loaded count should be displayed
            expect(fixture.nativeElement.querySelector('[data-test="LOADED_BATCH_FILE_COUNT"]').innerHTML)
                .toEqual('999 Excel files loaded');

            // Check the Download CSV link is displayed properly with the correct endpoint URL
            expect(fixture.nativeElement.querySelector('[data-test="DOWNLOAD_CSV_LINK"]').innerHTML).toEqual('Download list (CSV)');
            expect(fixture.nativeElement.querySelector('[data-test="DOWNLOAD_CSV_LINK"]').href)
                .toEqual('http://localhost:9876/endpoint-here');
        });
    }));

    // TODO - e2e test
    // it('should download CSV when the link is clicked', async(() => {
    //     fixture = TestBed.createComponent(CollectionExerciseDetailsComponent);
    //     instance = fixture.componentInstance;
    //
    //     instance.collectionExerciseDetails = {
    //         surveyTitle: 'Test survey name',
    //         inquiryCode: '99999',
    //         referencePeriod: '1 Jan 2016 - 31 Dec 2016',
    //         collectionInstrumentBatch: {
    //             current: 999,
    //             status: 'active'
    //         }
    //     };
    //
    //     fixture.detectChanges();
    //     fixture.whenStable().then(() => {
    //
    //         // TODO
    //
    //     });
    // }));
});
