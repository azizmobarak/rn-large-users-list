import {AnyAction, Reducer} from 'redux';
import {RemoteData} from '../../utils/typing';
import {userListViewActionsType} from './actions';

export interface UserState {
  name: string;
  image: string;
}

export interface UsersListState {
  users: UserState[];
  state: RemoteData;
  scrollToChart: string;
}

export const userListInitialState: UsersListState = {
  users: [],
  state: RemoteData.Loading,
  scrollToChart: '',
};

export const UsersReducer: Reducer<UsersListState> = (
  state: UsersListState = userListInitialState,
  action: AnyAction,
): UsersListState => {
  switch (action.type) {
    case userListViewActionsType.fillUserList: {
      const {data} = action.payload;
      return {
        ...state,
        users: data,
        state: data.length > 1 ? RemoteData.Data : RemoteData.Loading,
      };
    }

    case userListViewActionsType.fillUserListError:
      return {
        ...state,
        state: action.payload,
      };

    case userListViewActionsType.scrollToUsersByChart:
      return {
        ...state,
        scrollToChart: action.payload,
      };

    case userListViewActionsType.loadList:
      return {
        ...state,
        state: RemoteData.Loading,
      };

    default:
      return state;
  }
};
