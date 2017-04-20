import { combineReducers } from 'redux';
import { routerReducer } from '@angular-redux/router';
import { IAppState } from './app-state.interface';

import collectionExerciseReducer from './collection-exercises/collection-exercises.reducer';

export default combineReducers<IAppState>({
    collectionExercises: collectionExerciseReducer,

    router: routerReducer
});
