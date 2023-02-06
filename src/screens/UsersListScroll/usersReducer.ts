import {AnyAction, Reducer} from 'redux';
import {ListUsersResponse, RemoteData} from '../../utils/typing';
import {userListViewActionsType} from './actions';

export interface UserState {
  name: string;
  image: string;
}

export interface UsersListState {
  users: UserState[];
  state: RemoteData;
  lastPage: number;
  currentPage: number;
  pageLenght: number;
  onError: boolean;
  scrollToChart: string;
}

const userListInitialState: UsersListState = {
  users: [],
  state: RemoteData.Loading,
  lastPage: 0,
  currentPage: 0,
  pageLenght: 0,
  onError: false,
  scrollToChart: '',
};

export const UsersReducer: Reducer<UsersListState> = (
  state: UsersListState = userListInitialState,
  action: AnyAction,
): UsersListState => {
  switch (action.type) {
    case userListViewActionsType.fillUserList: {
      const {data, lastPage, currentPage, lenght}: ListUsersResponse =
        action.payload;
      console.log('cheeeck', currentPage);
      return {
        ...state,
        users: data,
        state: data.length > 1 ? RemoteData.Data : RemoteData.Loading,
        lastPage,
        currentPage,
        pageLenght: lenght,
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

    default:
      return state;
  }
};
