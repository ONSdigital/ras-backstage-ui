/*
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
 import { RouterTestingModule } from '@angular/router/testing'; 
import { Component } from "@angular/core";
import 'rxjs/add/operator/filter';

import { CollectionExerciseModule } from '../../collection-exercises.module';
import { CollectionExerciseListContainer } from './collection-exercise-list.container';

let fixture:ComponentFixture<any>, 
    instance:Component,
    page:Page;

class Page {  
    addPageElements() { 
        //this.titleBar = fixture.debugElement.nativeElement.querySelector('.bar__title') 
    } }

function createComponent(component:any) {  
    fixture = TestBed.createComponent(component); 
    instance = fixture.componentInstance; 
    page = new Page();  

    fixture.detectChanges(); 
    return fixture.whenStable().then(() => { 
        fixture.detectChanges(); 
        page.addPageElements(); 
    });
 }

describe('CollectionExercises component', () => {

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
                CollectionExerciseModule
            ]
        })
        .compileComponents();

        createComponent(CollectionExerciseListContainer);
    }));

    it('should create the component', async(() => {
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    }));
});
*/
