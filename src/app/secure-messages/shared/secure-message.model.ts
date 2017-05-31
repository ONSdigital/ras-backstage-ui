export interface SecureMessage {
    threadId?: string;
    msgId?: string;
    links?: string;
    labels?: Array<string>;
    read_date?: string;
    sent_date?: string;

    urn_to: string;
    urn_from: string;
    subject: string;
    body: string;
    collection_case: string;
    reporting_unit: string;
    survey: string;
}
