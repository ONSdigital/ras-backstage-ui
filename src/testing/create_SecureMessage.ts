export function createSecureMessage_server(threadId: string, id: string = '') {
    const labels: Array<any> = [];

    if (!id) {
        id = threadId;
    }

    return {
        thread_id: threadId,
        msg_id: id,
        urn_from: 'bres123',
        urn_to: [
            'bres123'
        ],
        body: 'Message body',
        labels: labels,
        sent_date: 'Fri, 02 Jun 2017 09:13:21 GMT',
        subject: 'Message subject',
        survey: 'bres123',
        collection_case: 'ACollectionCase',
        reporting_unit: 'AReportingUnit',
    };
}
