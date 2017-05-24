export interface SecureMessage {
    msgId?: string;
    threadId?: string;
    msgTo: {
        id: string,
        emailAddress?: string,
        firstName?: string,
        lastName?: string
    };
    msgFrom: {
        id: string,
        emailAdress?: string,
        firstName?: string,
        lastName?: string
    };
    subject: string;
    body: string;
    links?: string;
    collection_case: string;
    reporting_unit: string;
    survey: string;
}
