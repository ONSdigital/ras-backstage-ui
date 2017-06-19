export class NotificationListItem {
    public type = 'list-item';
    public label: string;
    public status: NotificationStatus;

    static create(opts: { label: string, status: NotificationStatus }) {

        opts = opts || {
            label: undefined,
            status: undefined
        };

        if (!opts.label) {
            throw Error('label field missing for new NotificationListItem');
        }

        if (!opts.status) {
            throw Error('status field missing for new NotificationListItem');
        }

        const instance = new NotificationListItem();
        instance.label = opts.label;
        instance.status = opts.status;

        return instance;
    }
}

export const enum NotificationStatus {
    success = 1,
    fail = 2
}
