import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HomeComponent } from './home.component';

import { environment } from '../../../environments/environment';

let fixture: ComponentFixture<any>;

describe('HomeComponent', () => {

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule
            ],
            declarations: [
                HomeComponent
            ]
        })
        .compileComponents();
    });

    describe('when initialising', () => {

        it('should assign responseOperationsUrl', async(() => {
            fixture = TestBed.createComponent(HomeComponent);

            fixture.detectChanges();
            fixture.whenStable().then(() => {
                fixture.detectChanges();

                const comp = fixture.debugElement.componentInstance;

                expect(comp.responseOperationsUrl).toEqual(environment.endpoints.responseOperationsApplication);
            });
        }));
    });
});
