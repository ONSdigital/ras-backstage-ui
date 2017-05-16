import { NgRedux } from '@angular-redux/store';

export function getDataStoreCollectionExerciseByRef(store: NgRedux<any>, collectionExerciseRef: string) {

    return store.select(['collectionExercises', 'items'])
        .map((collectionExercises: any) => (collectionExercises.find((item: any) => item.link === collectionExerciseRef)) || false)
        .first();

}
