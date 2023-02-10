import {RestServicesImp} from '../../services/api/RestServiceImp';
import {userListViewActions} from './actions';
import {RemoteData} from '../../utils/typing';
import {store} from '../../reducer/store';
import {UserState} from './usersReducer';

export function getUsersList(): void {
  const service = new RestServicesImp();
  const {dispatch} = store;

  service.getUsersList().subscribe((result: UserState[] | undefined) => {
    if (!result) {
      dispatch(userListViewActions.onError(RemoteData.Error));
    } else {
      dispatch(userListViewActions.getUsers(result));
    }
  });
}
