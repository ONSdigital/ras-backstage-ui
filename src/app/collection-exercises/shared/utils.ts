import { NgRedux } from '@angular-redux/store';
import 'rxjs/add/operator/first';

export function getDataStoreCollectionExerciseByRef(store: NgRedux<any>, collectionExerciseRef: string) {

    return store.select(['collectionExercises', 'items'])
        .map((collectionExercises: any) => (collectionExercises.find((item: any) => item.id === collectionExerciseRef)) || false)
        .share()
        .first();

}
