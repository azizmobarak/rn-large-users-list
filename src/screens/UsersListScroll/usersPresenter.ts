import {UserState} from './usersReducer';

interface userPresentable {
  pagination: number[];
  sortedList: UserState[];
}

export const userPresenterPresentable = (
  currentPgae: number,
  lastPage: number,
  users: UserState[],
  sortedTo: number,
): userPresentable => {
  if (isSimplaePagination(currentPgae, lastPage)) {
    return {
      pagination: simplePaginationArray(),
      sortedList: sortListList(users, sortedTo),
    };
  } else {
    return {
      pagination: [],
      sortedList: sortListList(users, sortedTo),
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
