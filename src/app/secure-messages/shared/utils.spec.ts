import { buildMsgTo } from './utils';
import { createRespondent_server } from '../../../testing/create_Respondent';
import { createReportingUnit_server } from '../../../testing/create_RerportingUnit';

const validBusiness = createReportingUnit_server(),
    validRespondent = createRespondent_server();

const respondentFullName = validRespondent.firstName + ' ' + validRespondent.lastName;

describe('utils [secure messages]', () => {

    describe('when supplied valid business & respondent data', () => {

        it('should return correctly formatted string', () => {

            expect(buildMsgTo(validBusiness, validRespondent))
                .toEqual(respondentFullName + ' for ' + validBusiness.name + ' - ' +
                    validBusiness.sampleUnitRef);
        });
    });

    describe('when supplied invalid respondent data', () => {

        it('should return formatted string with not found notification', () => {

            expect(buildMsgTo(validBusiness, undefined))
                .toEqual('(Respondent name not found) for ' + validBusiness.name + ' - ' +
                    validBusiness.sampleUnitRef);
        });
    });

    describe('when supplied invalid business data', () => {

        it('should return formatted string with not found notification', () => {

            expect(buildMsgTo(undefined, validRespondent))
                .toEqual(respondentFullName + ' for ' + '(Business name not found) - (Business reference not found)');

            const newRef = '123';

            expect(buildMsgTo({
                    sampleUnitRef: newRef
                }, validRespondent))
                .toEqual(respondentFullName + ' for (Business name not found) - ' + newRef);

            const newBusinessName = 'Test business name';

            expect(buildMsgTo({
                    name: newBusinessName
                }, validRespondent))
                .toEqual(respondentFullName + ' for ' + newBusinessName + ' - (Business reference not found)');
        });
    });
});
