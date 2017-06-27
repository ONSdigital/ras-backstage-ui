export interface SecureMessage {
    thread_id?: string;
    msg_id?: string;
    links?: string;
    labels?: Array<string>;
    read_date?: string;
    sent_date?: string;

    msg_to: string | Array<Object>;
    msg_from: string | Object;
    subject: string;
    body: string;
    collection_case?: string;
    reporting_unit: string;
    survey?: string;
}


/*"msg_from": {
    "email": "",
    "firstname": "BRES",
    "id": "BRES",
    "status": "",
    "surname": "",
    "telephone": ""
},*/


export interface DraftMessage extends SecureMessage {
    modified_date?: string;
}
