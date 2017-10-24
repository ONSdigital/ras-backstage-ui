import { Observable } from 'rxjs/Rx';
import { Router, NavigationEnd } from '@angular/router';

import { TestBed, async, ComponentFixture, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { Component } from '@angular/core';
import { HomeComponent } from './shared/home/home.component';
import { SecureMessagesComponent } from './secure-messages/secure-messages.component';

import { PartyService } from './party/party.service';
import { AuthenticationService } from './authentication/authentication.service';

import { environment } from '../environments/environment';

let fixture: ComponentFixture<any>,
    instance: Component,
    page: Page,

    mockPartyService: any,
    mockAuthenticationService: any;

const responseOperationsUrl = environment.endpoints.responseOperationsApplication,
    originalConsoleLog = console.log;

class Page {

    titleBar: HTMLElement;

    addPageElements() {
        this.titleBar = fixture.debugElement.nativeElement.querySelector('.bar__title');
    }
}

function createComponent(component: any) {

    fixture = TestBed.createComponent(component);
    instance = fixture.componentInstance;
    page = new Page();

    fixture.detectChanges();
    return fixture.whenStable().then(() => {
        fixture.detectChanges();
        page.addPageElements();
    });
}

describe('AppComponent', () => {

    beforeEach(() => {

        mockAuthenticationService = {
            isAuthenticated () {
                return true;
            }
        };

        mockPartyService = {
            getBusinessByRef () {
                return Observable.of({});
            }
        };

        spyOn(console, 'log').and.callThrough();
        spyOn(mockAuthenticationService, 'isAuthenticated').and.callThrough();
        spyOn(mockPartyService, 'getBusinessByRef').and.callThrough();

        TestBed.configureTestingModule({
            imports: [
                AppModule,
                RouterTestingModule.withRoutes([
                    { path: '', component: HomeComponent },
                    { path: 'secure-messages', component: SecureMessagesComponent }
                ])
            ],
            providers: [
                { provide: AuthenticationService, useValue: mockAuthenticationService },
                { provide: PartyService, useValue: mockPartyService }
            ],
            declarations: [
            ]
        })
        .compileComponents();
    });

    afterEach(() => {
        console.log = originalConsoleLog;
    });

    it('should create the app', async(() => {
        fixture = TestBed.createComponent(AppComponent);

        fixture.detectChanges();
        fixture.whenStable().then(() => {
            fixture.detectChanges();

            const comp = fixture.debugElement.componentInstance;
            expect(comp).toBeTruthy();
        });
    }));

    it('should initialise correctly',
        inject([Router], (router: Router) => {
            fixture = TestBed.createComponent(AppComponent);

            router.navigate(['123']);

            fixture.detectChanges();
            fixture.whenStable().then(() => {
                fixture.detectChanges();

                const comp = fixture.debugElement.componentInstance;

                expect(mockAuthenticationService.isAuthenticated).toHaveBeenCalled();

                expect(comp.path).toEqual('/123');
            });
        }));

    it('should render service title in sub heading', async(() => {
        fixture = TestBed.createComponent(AppComponent);

        fixture.detectChanges();
        fixture.whenStable().then(() => {
            fixture.detectChanges();

            const compiled = fixture.debugElement.nativeElement;
            expect(compiled.querySelector('.bar__title').textContent).toContain('Response Operations');
        });
    }));

    describe('when router events fails', () => {

        it('should log related error to console', async(() => {
            fixture = TestBed.createComponent(AppComponent);

            const comp = fixture.debugElement.componentInstance;
            const routerEventsErr = 'Error calling router events';

            comp.router = {
                events: Observable.throw(routerEventsErr)
            };

            try {
                fixture.detectChanges();
                fixture.whenStable().then(() => {
                    fixture.detectChanges();

                    expect(console.log).toHaveBeenCalledWith('Router error: ', routerEventsErr);
                });
            } catch (e) {
            } finally {}
        }));
    });
});
