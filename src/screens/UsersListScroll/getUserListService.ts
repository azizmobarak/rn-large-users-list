import {RestServicesImp} from '../../services/api/RestServiceImp';
import {userListViewActions} from './actions';
import {ListUsersResponse, RemoteData} from '../../utils/typing';
import {store} from '../../reducer/store';

export function getUsersList(page: number): void {
  const service = new RestServicesImp(page);
  const {dispatch} = store;

  service.getUsersList().subscribe((result: ListUsersResponse | undefined) => {
    if (!result) {
      dispatch(userListViewActions.onError(RemoteData.Error));
    } else {
      dispatch(userListViewActions.getUsers(result));
    }
  });
}
