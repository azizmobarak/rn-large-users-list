import {combainedReducers} from './RootReducer';
import {createStore} from '@reduxjs/toolkit';

export const store = createStore(combainedReducers());
