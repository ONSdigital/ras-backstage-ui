import { Observable } from 'rxjs/Observable';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute, NavigationEnd } from '@angular/router';

import { BreadcrumbComponent } from './breadcrumb.component';
import { BreadcrumbContainerComponent } from './breadcrumb.container';

import { createActivatedRoute } from '../../../testing/ActivatedRoute_stub';

let fixture: ComponentFixture<any>;

const activatedRoutePointer = {
    root: {}
};

describe('BreadcrumbContainerComponent', () => {

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule
            ],
            providers: [
                {
                    provide: ActivatedRoute,
                    useValue: activatedRoutePointer
                }
            ],
            declarations: [
                BreadcrumbComponent,
                BreadcrumbContainerComponent
            ]
        })
        .compileComponents();
    });

    it('should initialise correctly', async(() => {
        fixture = TestBed.createComponent(BreadcrumbContainerComponent);

        const comp = fixture.debugElement.componentInstance;

        activatedRoutePointer.root = {};

        spyOn(comp, 'breadcrumbItems');

        fixture.detectChanges();
        fixture.whenStable().then(() => {
            fixture.detectChanges();

            comp.router.events.next(new NavigationEnd(0, '', ''));

            expect(comp.breadcrumbItems).toHaveBeenCalledWith(activatedRoutePointer.root);
        });
    }));

    describe('breadcrumbItems [method]', () => {

        describe('when no children exist on route', () => {

            it('should return empty breadcrumb array', async(() => {
                fixture = TestBed.createComponent(BreadcrumbContainerComponent);

                fixture.detectChanges();
                fixture.whenStable().then(() => {
                    fixture.detectChanges();

                    const comp = fixture.debugElement.componentInstance;

                    const result = comp.breadcrumbItems({
                        children: []
                    });

                    expect(result).toEqual([]);
                });
            }));
        });

        describe('when child routes exist on route', () => {

            describe('and breadcrumb items exist on route', () => {
                it('should return an array of BreadcrumbItem objects', async(() => {
                    fixture = TestBed.createComponent(BreadcrumbContainerComponent);

                    fixture.detectChanges();
                    fixture.whenStable().then(() => {
                        fixture.detectChanges();
                        const comp = fixture.debugElement.componentInstance;

                        const anotherRoute = createActivatedRoute(
                            'another',
                            'Another');

                        const secureMessagesRoute = createActivatedRoute(
                            'secure-messages',
                            'Secure messages',
                            [
                                anotherRoute
                            ]);

                        const route = createActivatedRoute(
                            '',
                            '',
                            [
                                secureMessagesRoute
                            ]);

                        const result = comp.breadcrumbItems(route);

                        expect(result).toEqual([
                            {
                                label: 'Secure messages',
                                params: undefined,
                                link: '/secure-messages'
                            },
                            {
                                label: 'Another',
                                params: undefined,
                                link: '/secure-messages/another'
                            }
                        ]);
                    });
                }));
            });

            describe('and breadcrumb items do not exist on a ActivatedRoute', () => {

                it('should return an array of BreadcrumbItem objects omitting the non-existent ' +
                    'breadcrumb item', async(() => {

                    fixture = TestBed.createComponent(BreadcrumbContainerComponent);

                    fixture.detectChanges();
                    fixture.whenStable().then(() => {
                        const comp = fixture.debugElement.componentInstance;

                        const anotherRoute = createActivatedRoute(
                            'another',
                            'Another');

                        const secureMessagesRoute = createActivatedRoute(
                            'secure-messages',
                            'Secure messages',
                            [
                                anotherRoute
                            ]);

                        secureMessagesRoute.snapshot.data = {};

                        const route = createActivatedRoute(
                            '',
                            '',
                            [
                                secureMessagesRoute
                            ]);

                        const result = comp.breadcrumbItems(route);

                        expect(result).toEqual([
                            {
                                label: 'Another',
                                params: undefined,
                                link: '/another'
                            }
                        ]);
                    });
                }));
            });

            describe('and a routed component is not rendered to the primary outlet', () => {

                it('should return an array of BreadcrumbItem objects omitting the routed component not ' +
                    'rendered to the primary outlet', async(() => {

                    fixture = TestBed.createComponent(BreadcrumbContainerComponent);

                    fixture.detectChanges();
                    fixture.whenStable().then(() => {
                        const comp = fixture.debugElement.componentInstance;

                        const anotherRoute = createActivatedRoute(
                            'another',
                            'Another');

                        anotherRoute.outlet = 'different-outlet';

                        const secureMessagesRoute = createActivatedRoute(
                            'secure-messages',
                            'Secure messages',
                            [
                                anotherRoute
                            ]);

                        const route = createActivatedRoute(
                            '',
                            '',
                            [
                                secureMessagesRoute
                            ]);

                        const result = comp.breadcrumbItems(route);

                        expect(result).toEqual([
                            {
                                label: 'Secure messages',
                                params: undefined,
                                link: '/secure-messages'
                            }
                        ]);
                    });
                }));
            });
        });
    });
});
