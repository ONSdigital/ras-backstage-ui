import { NgRedux } from '@angular-redux/store';
import 'rxjs/add/operator/first';

import { Business, Respondent } from '../../party/party.model';

export function getDataStoreSecureMessageById(store: NgRedux<any>, secureMessageId: string) {

    return store.select(['secureMessages', 'items'])
        .map((secureMessages: any) => secureMessages.find((item: any) => item.msg_id === secureMessageId))
        .share()
        .first();
}

export function buildMsgTo(business: any, respondent: any) {

    /**
     * TODO - validate respondent and business response
     */
    if (!business || !respondent) {
        console.log('Business or respondent not found: ', business, respondent);
        return '';
    }

    const businessNameProp = business.name || business.business_name,
        businessReferenceProp = business.businessRef || business.ru_id,
        respondentFirstNameProp = respondent.firstName || respondent.firstname,
        respondentLastNameProp = respondent.lastName || respondent.surname;

    const businessName = !businessNameProp
        ? '(Business name not found)'
        : `${businessNameProp}`;

    const businessRef = !businessReferenceProp
        ? '(Business reference not found)'
        : `${businessReferenceProp}`;

    const respondentName = !respondentFirstNameProp || !respondentLastNameProp
        ? '(Respondent name not found)'
        : `${respondentFirstNameProp} ${respondentLastNameProp}`;

    return `${respondentName} for ${businessName} - ${businessRef}`;
}
