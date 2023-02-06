import {createStore} from 'redux';
import {combainedReducers} from './RootReducer';

export const store = createStore(combainedReducers());
