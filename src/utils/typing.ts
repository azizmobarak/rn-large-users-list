import {UserState} from '../screens/UsersListScroll/usersReducer';

export enum RemoteData {
  Loading,
  Data,
  Error,
}

export interface ListUsersResponse {
  data: UserState[];
  code: number;
  currentPage: number;
  lenght: number;
  lastPage: number;
}

export enum NavigationState {
  Blur = 'blur',
  Focus = 'focus',
}
