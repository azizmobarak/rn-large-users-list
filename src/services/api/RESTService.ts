import {UserState} from '../../screens/UsersListScroll/usersReducer';
import {Observable} from 'rxjs';

export interface RestService {
  getUsersList: () => Observable<UserState[]>;
}
