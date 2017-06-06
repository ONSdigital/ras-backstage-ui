export interface SecureMessage {
    thread_id?: string;
    msg_id?: string;
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
