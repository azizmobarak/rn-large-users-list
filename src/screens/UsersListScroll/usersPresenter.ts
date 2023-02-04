import {UserList, UserState} from './usersReducer';

interface userPresentable {
  usersData: UserState[];
}

class UserPresenter {
  constructor(private readonly userList: UserList[]) {}
}
