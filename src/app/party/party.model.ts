export interface Business {
    id: string;
    businessRef: string;
    contactName: string;
    employeeCount: number;
    enterpriseName: string;
    facsimile: string;
    fulltimeCount: number;
    legalStatus: BusinessLegalStatus;
    name: string;
    'sic2003': string;
    'sic2007': string;
    telephone: string;
    tradingName: string;
    turnover: number;
    attributes: Array<Object>;
}

export interface Respondent {
    id: string;
    emailAddress: string;
    firstName: string;
    lastName: string;
    telephone: string;
    status: RespondentStatus
}

enum BusinessLegalStatus {
    'Community Interest Company (CIC)',
    'Charitable Incorporated Organisation (CIO)',
    'Industrial and provident society',
    'General partnership',
    'Limited liability partnership (LLP)',
    'Limited partnership (LP)',
    'Private Limited Company',
    'Public Limited Company',
    'Unlimited Company',
    'Sole proprietorship'
}

enum RespondentStatus {
    'CREATED',
    'ACTIVE',
    'SUSPENDED'
}
