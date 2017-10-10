import { Component, Input } from '@angular/core';
import { PaginationLink } from './pagination-link.model';

@Component({
    selector: 'ons-pagination',
    styleUrls: ['pagination.component.scss'],
    templateUrl: 'pagination.component.html',
})
export class PaginationComponent {
    @Input() links: Array<PaginationLink>;
}
