import {AnyAction, Reducer} from 'redux';
import {RmoteData} from '../../utils/typing';
import {userListViewActionsType} from './actions';

export interface UserState {
  name: string;
  image: string;
}

interface ListUsersResponse {
  data: UserState[];
}

export interface UserList {
  users: ListUsersResponse[];
  state: RmoteData;
}

const userListInitialState: UserList = {
  users: [],
  state: RmoteData.Loading,
};

export const UsersReducer: Reducer<UserList> = (
  state: UserList = userListInitialState,
  action: AnyAction,
): UserList => {
  console.log(action);
  switch (action.type) {
    case userListViewActionsType.fillUserList: {
      const {data} = action.payload;
      return {
        users: data,
        state: RmoteData.Data,
      };
    }

    default:
      return state;
  }
};
