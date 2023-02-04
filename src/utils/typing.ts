import {UserState} from '../screens/UsersListScroll/usersReducer';

export enum RmoteData {
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
