import {Observable} from 'rxjs';
import {RestService} from './RESTService';
import {BASE_URL} from '../../base/baseURL';
import {UserState} from '../../screens/UsersListScroll/usersReducer';

export class RestServicesImp implements RestService {
  public getUsersList(): Observable<UserState[]> {
    return new Observable(sunscribe => {
      fetch(BASE_URL())
        .then(respone => respone.json())
        .then(result => {
          sunscribe.next(result);
          sunscribe.complete();
        })
        .catch(() => {
          sunscribe.next(undefined);
          sunscribe.complete();
        });
    });
  }
}
