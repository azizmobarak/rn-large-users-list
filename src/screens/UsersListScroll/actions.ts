import {createAction} from '../../reducer/actionCreator';
import {RemoteData} from '../../utils/typing';
import {UserState} from './usersReducer';

export const userListViewActionsType = {
  navigateToUserPagination: 'NAVIGATE_TO_USER_PAGINATION',
  fillUserList: 'FILL_USER_LIST',
  fillUserListError: 'FILL_USER_LIST_ERROR',
  scrollToUsersByChart: 'SCROLL_TO_USERS_BY_CHART',
  loadList: 'LOAD_LIST',
};

export const userListViewActions = {
  navigateToUserPagination: createAction(
    userListViewActionsType.navigateToUserPagination,
  ),
  getUsers: (payload: UserState[]) =>
    createAction<UserState[]>(userListViewActionsType.fillUserList, payload),
  onError: (payload: RemoteData) =>
    createAction<RemoteData>(
      userListViewActionsType.fillUserListError,
      payload,
    ),
  scrollToChart: (payload: string) =>
    createAction<string>(userListViewActionsType.scrollToUsersByChart, payload),
  loadList: () => createAction(userListViewActionsType.loadList),
};
