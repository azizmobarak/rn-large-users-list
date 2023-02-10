// import {RemoteData} from '../../utils/typing';
import {UserState} from './usersReducer';

interface userPresentable {
  sortedList: UserState[];
}

export const buildUsersListPresenter = (
  users: UserState[],
  sortedTo: number,
): userPresentable => ({
  sortedList: sortListList(users, sortedTo),
});

function sortListList(userList: UserState[], sortTo: number): UserState[] {
  let sortedList: UserState[] = [];
  sortedList = userList.sort((firstUuser, secondUser) =>
    sortNames(firstUuser.name, secondUser.name, sortTo),
  );
  return sortedList;
}

const sortNames = (
  firstName: string,
  secondName: string,
  sortedA: number,
): number => {
  if (firstName.charAt(0) > secondName.charAt(0)) {
    return sortedA;
  }
  if (firstName.charAt(0) < secondName.charAt(0)) {
    return -sortedA;
  }
  return 0;
};

// function getScreebHeaderTitle(state: RemoteData): string {
//   switch (state) {
//     case RemoteData.Loading:
//       return 'please wait ..... Users is loading';
//     default:
//       return 'Try Pagination & scroll Top Bottom';
//   }
// }
