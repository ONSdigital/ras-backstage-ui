export interface SecureMessage {
    msgId?: string;
    threadId?: string;
    urn_to: string;
    urn_from: string;
    subject: string;
    body: string;
    links?: string;
    collection_case: string;
    reporting_unit: string;
    survey: string;
}
