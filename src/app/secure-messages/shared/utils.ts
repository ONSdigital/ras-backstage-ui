import { NgRedux } from '@angular-redux/store';
import 'rxjs/add/operator/first';

export function getDataStoreSecureMessageById(store: NgRedux<any>, secureMessageId: string) {

    return store.select(['secureMessages', 'items'])
        .map((collectionExercises: any) => (collectionExercises.find((item: any) => item.msg_id === secureMessageId)) || false)
        .first();

}
