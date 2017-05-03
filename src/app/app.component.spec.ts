import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AppComponent } from './app.component';
import { Component } from '@angular/core';

let fixture: ComponentFixture<any>,
    instance: Component,
    page: Page;

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

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule
            ],
            declarations: [
                AppComponent
            ]
        })
        .compileComponents();

        createComponent(AppComponent);
    }));

    it('should create the app', async(() => {
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    }));

    it('should render service title in sub heading', async(() => {
        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('.bar__title').textContent).toContain('Collect the data');
    }));
});
