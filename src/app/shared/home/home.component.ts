import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
    moduleId: module.id, // For aot compiler relative paths

    templateUrl: 'home.component.html'
})

export class HomeComponent implements OnInit {
    public responseOperationsUrl: string;

    ngOnInit() {
        this.responseOperationsUrl = environment.endpoints.responseOperationsApplication;
    }
}
