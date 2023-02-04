import {Reducer, combineReducers} from 'redux';
import {UserList, UsersReducer} from '../screens/UsersListScroll/usersReducer';

type ZippedReducersType<T> = {
  [key in keyof T]: Reducer<T[key]>;
};

export interface RootState {
  usersReducer: UserList;
}

const zipedReducer = (): ZippedReducersType<RootState> => ({
  usersReducer: UsersReducer,
});

export const combainedReducers = () =>
  combineReducers<RootState>(zipedReducer());
