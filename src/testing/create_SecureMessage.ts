export function createSecureMessage_server(threadId: string, id: string = '') {
    const labels: Array<any> = [];

    if (!id) {
        id = threadId;
    }

    return {
        thread_id: threadId,
        msg_id: id,
        msg_from: 'bres123',
        msg_to: [
            'bres123'
        ],
        body: 'Message body',
        labels: labels,
        sent_date: 'Fri, 02 Jun 2017 09:13:21 GMT',
        subject: 'Message subject',
        survey: 'bres123',
        collection_case: 'ACollectionCase',
        reporting_unit: 'AReportingUnit'
    };
}

export function createSecureMessage_client() {

    return {
        msg_from: 'internal.user',
        msg_to: 'external.user',
        body: 'Message body',
        subject: 'Message subject',
        survey: 'bres123',
        collection_case: 'ACollectionCase',
        reporting_unit: 'AReportingUnit',
    };
}

export function createDraftMessage_client() {

    return {
        msg_from: 'internal.user',
        msg_to: 'respondent123',
        subject: 'Test draft subject',
        body: 'Test draft body',
        survey: 'BRES',
        collection_case: 'ACollectionCase',
        reporting_unit: 'AReportingUnit'
    };
}

export function createDraftMessage_server(id: string) {

    const labels: Array<any> = [];

    return {
        msg_id: id,
        msg_from: 'bres123',
        msg_to: [
            'bres123'
        ],
        body: 'Message draft body',
        labels: labels,
        sent_date: 'Fri, 02 Jun 2017 09:13:21 GMT',
        subject: 'Message subject',
        survey: 'bres123',
        collection_case: 'ACollectionCase',
        reporting_unit: 'AReportingUnit'
    };
}
