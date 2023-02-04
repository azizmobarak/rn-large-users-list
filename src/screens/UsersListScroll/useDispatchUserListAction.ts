import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {RestServicesImp} from '../../services/api/RestServiceImp';
import {userListViewActionsType} from './actions';
import {ListUsersResponse} from '../../utils/typing';

export function useDispatchUserListAction(page: number): void {
  const service = new RestServicesImp(page);
  const dispatch = useDispatch();

  useEffect(() => {
    service.getUsersList().subscribe((data: ListUsersResponse) => {
      dispatch({
        payload: data.data,
        type: userListViewActionsType.fillUserList,
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
