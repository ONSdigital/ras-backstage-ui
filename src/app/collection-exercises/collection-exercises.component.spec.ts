import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BreadcrumbModule } from '../shared/breadcrumb/breadcrumb.module';

import { CollectionExercisesComponent } from './collection-exercises.component';

describe('CollectionExercises component', () => {

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
                BreadcrumbModule
            ],
            declarations: [
                CollectionExercisesComponent
            ]
        }).compileComponents();
    }));

    it('should create the component', async(() => {
        const fixture = TestBed.createComponent(CollectionExercisesComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    }));
});
