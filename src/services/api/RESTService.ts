import {ListUsersResponse} from '../../utils/typing';
import {Observable} from 'rxjs';

export interface RestService {
  getUsersList: () => Observable<ListUsersResponse>;
}
