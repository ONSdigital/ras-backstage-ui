export interface SecureMessage {
    thread_id?: string;
    msg_id?: string;
    links?: string;
    labels?: Array<string>;
    read_date?: string;
    sent_date?: string;

    msg_to: string | Array<any>;
    msg_from: string | Object;
    subject: string;
    body: string;
    collection_case?: string;
    ru_id: string;
    survey?: string;

    '@msg_to'?: any;
    '@msg_from'?: any;
    '@collection_case'?: any;
    '@ru_id'?: any;
    '@survey'?: any;
}


export interface DraftMessage extends SecureMessage {
    modified_date?: string;
}


export interface MessageLabels {
    label: string;
    action: string;
}
