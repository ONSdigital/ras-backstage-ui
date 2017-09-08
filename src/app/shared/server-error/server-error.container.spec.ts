import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ServerErrorContainerComponent } from './server-error.container';
import { ServerErrorComponent } from './server-error.component';

let fixture: ComponentFixture<any>,
    mockQueryParams_observable: any;

const originalConsoleLog = console.log,
    activatedRoutePointer: any = {
        queryParams: {}
    };

describe('ServerErrorContainerComponent', () => {

    beforeEach(() => {

        spyOn(console, 'log');

        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule
            ],
            providers: [
                { provide: ActivatedRoute, useValue: activatedRoutePointer }
            ],
            declarations: [
                ServerErrorComponent,
                ServerErrorContainerComponent
            ]
        })
        .compileComponents();
    });

    afterEach(() => {
        mockQueryParams_observable = undefined;
        activatedRoutePointer.queryParams = {};
        console.log = originalConsoleLog;
    });

    describe('when route has query parameters', () => {

        beforeEach(() => {
            mockQueryParams_observable = Observable.of({
                errorResponseCode: '200',
                errorHeading: 'Heading from route',
                errorBody: 'Error body here'
            });

            activatedRoutePointer.queryParams = mockQueryParams_observable;
        });

        it('should initialise correctly', () => {
            fixture = TestBed.createComponent(ServerErrorContainerComponent);

            fixture.detectChanges();
            fixture.whenStable().then(() => {
                fixture.detectChanges();

                const comp = fixture.debugElement.componentInstance;

                expect(comp.errorResponseCode).toEqual(mockQueryParams_observable.errorResponseCode);
                expect(comp.errorHeading).toEqual(mockQueryParams_observable.errorHeading);
                expect(comp.errorBody).toEqual(mockQueryParams_observable.errorBody);
            });
        });
    });

    describe('when route does not have query parameters', () => {

        beforeEach(() => {
            mockQueryParams_observable = Observable.throw('Some error');

            activatedRoutePointer.queryParams = mockQueryParams_observable;
        });

        it('should log error to console', () => {
            fixture = TestBed.createComponent(ServerErrorContainerComponent);

            fixture.detectChanges();
            fixture.whenStable().then(() => {
                fixture.detectChanges();

                const comp = fixture.debugElement.componentInstance;

                expect(comp.errorResponseCode).toEqual('');
                expect(comp.errorHeading).toEqual('');
                expect(comp.errorBody).toEqual('');
                expect(console.log).toHaveBeenCalledWith('Error: ', 'Some error');
            });
        });
    });
});
