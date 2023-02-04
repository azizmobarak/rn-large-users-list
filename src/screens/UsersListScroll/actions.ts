import {createAction} from '../../reducer/actionCreator';
import {UserState} from './usersReducer';

export const userListViewActionsType = {
  navigateToUserPagination: 'NAVIGATE_TO_USER_PAGINATION',
  fillUserList: 'FILL_USER_LIST',
};

export const userListViewActions = {
  navigateToUserPagination: createAction(
    userListViewActionsType.navigateToUserPagination,
  ),
  getUsers: (payload: UserState[]) =>
    createAction<UserState[]>(userListViewActionsType.fillUserList, payload),
};
