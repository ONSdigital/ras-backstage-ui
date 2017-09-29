import { NotificationListItem } from './system-feedback.model';
import { NotificationStatus } from './system-feedback.model';

let options: any;

describe('NotificationListItem', () => {

    describe('create [method]', () => {

        describe('when all properties required are found in opts argument', () => {

            beforeEach(() => {
                options = {
                    label: 'Testing label',
                    status: NotificationStatus.success
                };
            });

            it('should return a new instance of NotificationListItem', () => {
                const result = new NotificationListItem();
                Object.assign(result, options);

                expect(NotificationListItem.create(options)).toEqual(result);
            });
        });

        describe('when label is missing in opts argument', () => {

            beforeEach(() => {
                options = {
                    status: NotificationStatus.success
                };
            });

            it('should throw related error', () => {
                expect(function () { NotificationListItem.create(options); })
                    .toThrow(Error('label field missing for new NotificationListItem'));
            });
        });

        describe('when status is missing in opts argument', () => {

            beforeEach(() => {
                options = {
                    label: 'Test label'
                };
            });

            it('should throw related error', () => {
                expect(function () { NotificationListItem.create(options); })
                    .toThrow(Error('status field missing for new NotificationListItem'));
            });
        });
    });
});
