// import {useEffect} from 'react';
// import {useDispatch} from 'react-redux';
import {RestServicesImp} from '../../services/api/RestServiceImp';
import {userListViewActions} from './actions';
import {ListUsersResponse, RemoteData} from '../../utils/typing';
import {store} from '../../reducer/store';

export function getUsersList(page: number): void {
  console.log('page', page);
  const service = new RestServicesImp(page);
  const {dispatch} = store;
  // const dispatch = useDispatch();

  service.getUsersList().subscribe((result: ListUsersResponse | undefined) => {
    if (!result) {
      dispatch(userListViewActions.onError(RemoteData.Error));
    } else {
      dispatch(userListViewActions.getUsers(result));
    }
  });

  // useEffect(() => {

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);
}
