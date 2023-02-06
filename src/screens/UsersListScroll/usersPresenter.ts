import {RemoteData} from '../../utils/typing';
import {UserState} from './usersReducer';

interface userPresentable {
  pagination: number[];
  sortedList: UserState[];
  title: string;
}

export const buildUsersListPresenter = (
  currentPgae: number,
  lastPage: number,
  users: UserState[],
  sortedTo: number,
  state: RemoteData,
): userPresentable => {
  if (isSimplaePagination(currentPgae, lastPage)) {
    return {
      pagination: [],
      sortedList: sortListList(users, sortedTo),
      title: getScreebHeaderTitle(state),
    };
  } else {
    // this condition is added in case small list but will never happen since we have a large list
    return {
      pagination: simplePaginationArray(),
      sortedList: sortListList(users, sortedTo),
      title: getScreebHeaderTitle(state),
    };
  }
};

function isSimplaePagination(currentPgae: number, lastPage: number): boolean {
  if (lastPage - currentPgae <= 4) {
    return true;
  }
  return false;
}

function simplePaginationArray(): number[] {
  const simplePages: number[] = [];
  for (let i = 0; i < 3; i++) {
    simplePages.push(i);
  }
  return simplePages;
}

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

function getScreebHeaderTitle(state: RemoteData): string {
  switch (state) {
    case RemoteData.Loading:
      return 'please wait ..... Users is loading';
    default:
      return 'Try Pagination & scroll Top Bottom';
  }
}
