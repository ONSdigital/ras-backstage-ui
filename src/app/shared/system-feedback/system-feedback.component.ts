import { Component, Input } from '@angular/core';
import { NotificationListItem } from './system-feedback.model';

@Component({
    moduleId: module.id, // For aot compiler relative paths
    selector: 'ons-system-feedback',

    styleUrls: ['system-feedback.component.scss'],
    templateUrl: 'system-feedback.component.html'
})
export class SystemFeedbackComponent {

    @Input() notificationListItems: Array<NotificationListItem>;

}
