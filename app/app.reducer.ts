import { combineReducers } from 'redux';
import { routerReducer } from 'ng2-redux-router';
import { IAppState } from './app-state.interface';

export default combineReducers<IAppState>({
    router: routerReducer
});
